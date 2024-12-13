"use client";
import React, { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
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
import toast from "react-hot-toast";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryData from "@/data/CountryLabel.json";
import { getAccessToken } from "@/utils/accessToken";
import { Checkbox } from "../ui/checkbox";
import { useCheckoutShippingAddressUpdateMutation } from "../../../gql/graphql";
import { useCheckoutBillingAddressUpdateMutation } from "../../../gql/graphql";
import { useCheckoutShippingMethodUpdateMutation } from "../../../gql/graphql";
import { KuwaitAddressEN } from "@/data/KuwaitAddress";
import { LanguageCodeEnum } from "../../../gql/graphql";

import { CountryCode } from "../../../gql/graphql";

interface CountryOption {
  value: CountryCode;
  label: string;
}

interface AreaOption {
  value: string;
  label: string;
}

interface CityOption {
  value: string;
  label: string;
}

type CountryDataType = typeof CountryData;

interface ShippingDetailsProps {
  onNext: () => void;
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

const ShippingBillingsDetails: React.FC<ShippingDetailsProps> = ({
  onNext,
}) => {
  const { cartItems } = useCart();
  const checkoutId = localStorage.getItem("checkoutID") || "";
  const [loading, setLoading] = useState(false);
  const token = getAccessToken();

  const savedShippingAddress = localStorage.getItem("shippingAddress");
  const initialShippingData = savedShippingAddress
    ? JSON.parse(savedShippingAddress)
    : null;

  const form = useForm<ShippingFormInputs>({
    defaultValues: {
      country: initialShippingData
        ? {
            value: initialShippingData.country.code,
            label: initialShippingData.country.country,
          }
        : null,
      countryArea: initialShippingData?.countryArea || null,
      firstName: initialShippingData?.firstName || "",
      lastName: initialShippingData?.lastName || "",
      phone: initialShippingData?.phone || "",
      companyName: initialShippingData?.companyName || "",
      streetAddress1: initialShippingData?.streetAddress1 || "",
      streetAddress2: initialShippingData?.streetAddress2 || "",
      postalCode: initialShippingData?.postalCode || "",
      city: initialShippingData?.city || null,
      nonKuwaitCity: initialShippingData?.city || null,
      nonKuwaitCountry: initialShippingData?.countryArea || null,
    },
  });

  const { handleSubmit, reset } = form;

  const [shipping, { loading: shippingLoading }] =
    useCheckoutShippingAddressUpdateMutation();

  const [billing, { loading: billingLoading }] =
    useCheckoutBillingAddressUpdateMutation();

  const [shippingMethodUpdate, { loading: shippingMethodLoading }] =
    useCheckoutShippingMethodUpdateMutation();

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

  const onSubmit: SubmitHandler<ShippingFormInputs> = async (data) => {
    setLoading(true);

    if (
      !data.agreeToTerms &&
      (!data.country ||
        !data.firstName ||
        !data.lastName ||
        !data.phone ||
        !data.streetAddress1 ||
        !data.city ||
        !data.postalCode)
    ) {
      toast.error("Please fill in all required fields!");
      setLoading(false);
      return;
    }

    try {
      const shippingResponse = await shipping({
        variables: {
          checkoutId: checkoutId,
          shippingAddress: {
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
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      console.log("Shipping Response", shippingResponse);

      const errors =
        shippingResponse.data?.checkoutShippingAddressUpdate?.errors;

      if (errors && errors.length > 0) {
        toast.error(`${errors[0].message}`);
        setLoading(false);
        return;
      }

      if (!data.agreeToTerms) {
        toast.error("Please agree to the terms and conditions!");
        setLoading(false);
        return;
      }

      if (data.agreeToTerms) {
        const billingResponse = await billing({
          variables: {
            checkoutId: checkoutId,
            billingAddress: {
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
          },
          context: {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        });

        console.log("Billing Response", billingResponse);

        const billingErrors =
          billingResponse.data?.checkoutBillingAddressUpdate?.errors;

        if (billingErrors && billingErrors.length > 0) {
          toast.error(`${billingErrors[0].message}`);
          setLoading(false);
          return;
        } else {

          const shippingMethods =
            shippingResponse.data?.checkoutShippingAddressUpdate?.checkout
              ?.shippingMethods;

          if (Array.isArray(shippingMethods) && shippingMethods.length > 0) {
            const selectedShippingMethod = shippingMethods[0];
            localStorage.setItem(
              "shippingMethodId",
              JSON.stringify(selectedShippingMethod)
            );
            localStorage.setItem(
              "shippingAddress",
              JSON.stringify(
                shippingResponse.data?.checkoutShippingAddressUpdate?.checkout
                  ?.shippingAddress
              )
            );

            const storedShippingMethod = JSON.parse(
              localStorage.getItem("shippingMethodId") || "{}"
            );
            const shippingMethodId = storedShippingMethod?.id;

            if (checkoutId && shippingMethodId) {
              const addShippingMethod = await shippingMethodUpdate({
                variables: {
                  id: checkoutId,
                  deliveryMethodId: shippingMethodId,
                  locale: "EN_US" as LanguageCodeEnum,
                },
              });

              toast.success("Shipping details saved successfully!");
              console.log(
                "Shipping Method Updated in Shipping",
                addShippingMethod
              );

              onNext();
              reset();
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-3">
        Checkout ({cartItems.length} items)
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] md:w-[70%] lg:w-[60%]"
        >
          <h1 className="text-md font-semibold">1. Shipping Address</h1>
          <div className="my-4">
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
            <div className="my-4">
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
                          // console.log(
                          //   "Selected Area Value:",
                          //   selectedOption?.value
                          // );
                        }}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
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
            <div className="my-4">
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
                          // console.log(
                          //   "Selected City Value:",
                          //   selectedOption?.value
                          // );
                        }}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
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
            <div className="my-4">
              <FormField
                control={form.control}
                name="nonKuwaitCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Counggtry Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Country Area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex flex-row justify-between gap-4 my-4">
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

          <div className="my-4 w-full">
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
          <div className="my-4 w-full">
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

          <div className="flex flex-row justify-between gap-4 my-4">
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

          <div className="flex flex-row justify-between gap-4 my-4">
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

          {/* Checkbox */}
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 my-3">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel
                    className="font-normal text-xs text-textgray"
                    htmlFor="terms"
                  >
                    Add Billing Address same as the Shipping Address
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {loading ? "Loading..." : "Save and Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingBillingsDetails;
