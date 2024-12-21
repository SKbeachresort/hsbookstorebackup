"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryData from "@/data/CountryLabel.json";
import { CountryCode } from "../../../gql/graphql";
import { KuwaitAddressEN } from "@/data/KuwaitAddress";
import { LanguageCodeEnum } from "../../../gql/graphql";
import { Checkbox } from "../ui/checkbox";
import { useAddressCreateMutation } from "../../../gql/graphql";
import { AddressTypeEnum } from "../../../gql/graphql";
import toast from "react-hot-toast";
import { useAddressUpdateMutation } from "../../../gql/graphql";
import { useAddressUser } from "@/hooks/getUserAddress";

interface CountryOption {
  value: CountryCode;
  label: string;
};

interface AreaOption {
  value: string;
  label: string;
}

interface CityOption {
  value: string;
  label: string;
}

interface ShippingFormInputs {
  country: CountryOption | null;
  countryArea: AreaOption | null;
  city: CityOption | null;
  nonKuwaitCity: string;
  nonKuwaitCountry: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  token: string;
  agreeToTerms: boolean;
}

interface AddressFormProps {
  closeModal: () => void;
  addressData: any;
}

const AddressFormUpdate: React.FC<AddressFormProps> = ({
  closeModal,
  addressData,
}) => {
  console.log("Selected Address Data", addressData);

  const form = useForm<ShippingFormInputs>({
    defaultValues: {
      country: addressData?.country
        ? {
            label: addressData.country.country,
            value: addressData.country.code,
          }
        : null,
      countryArea: addressData?.countryArea
        ? {
            label: addressData.countryArea.countryArea,
            value: addressData.countryArea,
          }
        : null,
      firstName: addressData.firstName || "",
      lastName: addressData.lastName || "",
      phone: addressData.phone || "",
      companyName: addressData.companyName || "",
      streetAddress1: addressData.streetAddress1 || "",
      streetAddress2: addressData.streetAddress2 || "",
      postalCode: addressData.postalCode || "",
      city: null,
      nonKuwaitCity: addressData.city || "",
      nonKuwaitCountry: addressData.countryArea || "",
    },
  });

  const { handleSubmit, reset } = form;
  const {refetchUserAddresses} = useAddressUser();

  const kuwaitAreas = useMemo(() => {
    return KuwaitAddressEN.items.map((area) => ({
      value: area.id.toString(),
      label: area.name,
    }));
  }, []);

  const getCitiesForArea = (areaId: string) => {
    const selectedArea = KuwaitAddressEN.items.find(
      (area) => area.id.toString() === areaId
    );

    return selectedArea
      ? selectedArea.items.map((city) => ({
          value: city.id.toString(),
          label: city.name,
        }))
      : [];
  };

  const selectedCountry = form.watch("country");
  const selectedArea = form.watch("countryArea");

  const [addressCreate] = useAddressCreateMutation();
  const [addressUpdate] = useAddressUpdateMutation();
  const [isLoading, setIsLoading] = useState(false);

  const [isShhipping, setIsShipping] = useState(true);

  const toggleAddressType = () => {
    setIsShipping(!isShhipping);
  };

  const onSubmit: SubmitHandler<ShippingFormInputs> = async (data) => {
    // console.log("Form Data", data);
    setIsLoading(true);
    try {
      if (addressData) {
        const response = await addressUpdate({
          variables: {
            input: {
              firstName: data.firstName,
              lastName: data.lastName,
              streetAddress1: data.streetAddress1,
              streetAddress2: data.streetAddress2,
              city: data.city?.value || data.nonKuwaitCity,
              postalCode: data.postalCode,
              countryArea: data.countryArea?.value || data.nonKuwaitCountry,
              country: data.country?.value,
              phone: data.phone,
              companyName: data.companyName,
            },
            id: addressData.id,
          },
        });
        const errors = response.data?.accountAddressUpdate?.errors;
        if (errors && errors.length > 0) {
          toast.error(`${errors[0].message}`);
        } else {
          toast.success("Address Updated Successfully");
          refetchUserAddresses();
        };
      } else {
        const response = await addressCreate({
          variables: {
            input: {
              firstName: data.firstName,
              lastName: data.lastName,
              streetAddress1: data.streetAddress1,
              streetAddress2: data.streetAddress2,
              city: data.city?.value || data.nonKuwaitCity,
              postalCode: data.postalCode,
              countryArea: data.countryArea?.value || data.nonKuwaitCountry,
              country: data.country?.value,
              phone: data.phone,
              companyName: data.companyName,
            },
            type: isShhipping
              ? AddressTypeEnum.Shipping
              : AddressTypeEnum.Billing,
          },
        });
        const errors = response.data?.accountAddressCreate?.errors;
        if (errors && errors.length > 0) {
          toast.error(`${errors[0].message}`);
        } else {
          toast.success("Address Saved Successfully");
        };
      }
    } catch (error) {
      console.log("API Error", error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg  relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <div
        className="flex flex-row w-[60%] cursor-pointer border-2 border-primary bg-white text-white drop-shadow-sm relative overflow-hidden rounded-full"
        onClick={toggleAddressType}
      >
        <div
          className={`bg-primary w-[50%] rounded-full h-full absolute top-0 left-0 -z-10 transition-transform duration-300 ease-in-out ${
            isShhipping ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <p
          className={`w-[50%] flex flex-col justify-center items-center text-sm font-medium py-2 rounded-xl transition-colors duration-300 ${
            isShhipping ? " text-white font-semibold" : "text-textColor"
          }`}
        >
          Shipping
        </p>
        <p
          className={`w-[50%] flex flex-col justify-center items-center text-sm font-medium py-2 rounded-xl transition-colors duration-300 ${
            !isShhipping ? " text-white font-semibold" : "text-textColor"
          }`}
        >
          Billing
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="my-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Country / Label</FormLabel>
                  <FormControl>
                    <Select<CountryOption>
                      options={
                        CountryData.data.countryOptions as CountryOption[]
                      }
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        form.setValue("countryArea", null);
                        form.setValue("city", null);
                        // console.log(
                        //   "Selected Country Value:",
                        //   selectedOption?.value
                        // );
                      }}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.value}
                      placeholder="Select Country"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedCountry?.value === "KW" && (
            <div className="my-2">
              <FormField
                control={form.control}
                name="countryArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Country Area</FormLabel>
                    <FormControl>
                      <Select<AreaOption>
                        options={kuwaitAreas}
                        {...field}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          form.setValue("city", null);
                          console.log(
                            "Selected Area Value:",
                            selectedOption?.value
                          );
                        }}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.label}
                        placeholder="Select Country Area"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {selectedCountry?.value === "KW" && selectedArea && (
            <div className="my-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*City</FormLabel>
                    <FormControl>
                      <Select<CityOption>
                        options={getCitiesForArea(selectedArea.value)}
                        {...field}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          console.log(
                            "Selected City Value:",
                            selectedOption?.value
                          );
                        }}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.label}
                        placeholder="Select City"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {selectedCountry?.value !== "KW" && (
            <div className="my-2">
              <FormField
                control={form.control}
                name="nonKuwaitCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Country Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Country Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex flex-row justify-between gap-4 my-2">
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="my-2 w-full">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      country={
                        form.watch("country")?.value?.toLowerCase() || "kw"
                      }
                      onChange={(value) => field.onChange(value)}
                      placeholder="Enter Phone Number"
                      inputClass="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2 w-full">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row justify-between gap-4 my-2">
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="streetAddress1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Flat No</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Flat no." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="streetAddress2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between gap-4 my-2">
            {selectedCountry?.value !== "KW" && (
              <div className="w-[48%]">
                <FormField
                  control={form.control}
                  name="nonKuwaitCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-3 bg-secondary text-white">
            {isLoading ? "Saving Address" : "Save and Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressFormUpdate;
