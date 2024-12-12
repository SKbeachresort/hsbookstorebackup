"use client";
import React, { useState } from "react";
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

import { CountryCode } from "../../../gql/graphql";

interface CountryOption {
  value: CountryCode;
  label: string;
};

type CountryDataType = typeof CountryData;

interface ShippingDetailsProps {
  onNext: () => void;
};

interface ShippingFormInputs {
  country: CountryOption | null;
  countryArea: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  city: string;
  token: string;
  agreeToTerms: boolean;
};

const ShippingBillingsDetails: React.FC<ShippingDetailsProps> = ({
  onNext,
}) => {
  const { cartItems } = useCart();
  const checkoutId = localStorage.getItem("checkoutID") || "";
  // console.log("Checkout ID:", checkoutId);
  const [loading, setLoading] = useState(false);
  const token = getAccessToken();

  const form = useForm<ShippingFormInputs>({
    defaultValues: {
      country: null,
      countryArea: "",
      firstName: "",
      lastName: "",
      phone: "",
      companyName: "",
      streetAddress1: "",
      streetAddress2: "",
      postalCode: "",
      city: "",
      agreeToTerms: false,
    },
  });

  const { handleSubmit, reset } = form;

  const [shipping, { loading: shippingLoading }] =
    useCheckoutShippingAddressUpdateMutation();

  const [billing, { loading: billingLoading }] =
    useCheckoutBillingAddressUpdateMutation();

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
      // Call Shipping API
      const shippingResponse = await shipping({
        variables: {
          checkoutId: checkoutId,
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            streetAddress1: data.streetAddress1,
            streetAddress2: data.streetAddress2,
            city: data.city,
            postalCode: data.postalCode,
            countryArea: data.countryArea,
            country: data.country?.value,
            phone: data.phone,
            companyName: data.companyName,
          },
        },
      });

      console.log("Shipping Response:", shippingResponse);
      const errors =
        shippingResponse.data?.checkoutShippingAddressUpdate?.errors;

      if (errors && errors.length > 0) {
        toast.error(`${errors[0].message}`);
      };

      if(!data.agreeToTerms) {
        toast.error("Please agree to the terms and conditions!");
        setLoading(false);
        return;
      };

      if (data.agreeToTerms) {
        const billingResponse = await billing({
          variables: {
            checkoutId: checkoutId,
            billingAddress: {
              firstName: data.firstName,
              lastName: data.lastName,
              streetAddress1: data.streetAddress1,
              streetAddress2: data.streetAddress2,
              city: data.city,
              postalCode: data.postalCode,
              countryArea: data.countryArea,
              country: data.country?.value,
              phone: data.phone,
              companyName: data.companyName,
            },
          },
        });

        console.log("Billing Response:", billingResponse);
        const errors =
          billingResponse.data?.checkoutBillingAddressUpdate?.errors;

        if (errors && errors.length > 0) {
          toast.error(`${errors[0].message}`);
        } else {
          toast.success("Shipping details saved successfully!");

          const shippingMethodId =
            shippingResponse.data?.checkoutShippingAddressUpdate?.checkout
              ?.shippingMethods;

          const shippingAdress =
            shippingResponse.data?.checkoutShippingAddressUpdate?.checkout
              ?.shippingAddress;
          const JsonShippingAdress = JSON.stringify(shippingAdress);    
          const JsonShippingMethodId = JSON.stringify(shippingMethodId);
          localStorage.setItem("shippingMethodId", JsonShippingMethodId);
          localStorage.setItem("shippingAddress", JsonShippingAdress);
          onNext();
          reset();
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
                        console.log(
                          "Selected Country Value:",
                          selectedOption?.value
                        );
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

          <div className="my-4">
            <FormField
              control={form.control}
              name="countryArea"
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
            <div className="w-[48%]">
              <FormField
                control={form.control}
                name="city"
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Save and Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingBillingsDetails;
