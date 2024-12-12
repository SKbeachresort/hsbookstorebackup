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

interface OptionType {
  value: string;
  label: string;
};

interface ShippingDetailsProps {
  onNext: () => void;
};

interface ShippingFormInputs {
  country: OptionType | null;
  countryArea: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  city: string;
};

const ShippingBillingsDetails: React.FC<ShippingDetailsProps> = ({
  onNext,
}) => {
  const { cartItems } = useCart();
  const checkoutId = localStorage.getItem("checkoutId");
  const [loading, setLoading] = useState(false);

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
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<ShippingFormInputs> = (data) => {
    setLoading(true);
    console.log("Shipping Details:", data);

    setTimeout(() => {
      toast.success("Shipping details saved successfully!");
      setLoading(false);
      onNext();
      reset();
    }, 1000);
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
          <h1 className="text-md font-semibold">1. Shieepping Address</h1>

          <div className="my-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Country / Label</FormLabel>
                  <FormControl>
                    <Select<OptionType>
                      options={CountryData.data.countryOptions} 
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
                      <Input placeholder="Enter Floor" {...field} />
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
                      <Input placeholder="Enter Apartment" {...field} />
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
                      country={form.watch("country")?.value?.toLowerCase() || "kw"}
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
              name="phone"
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
                      <Input placeholder="Enter Block" {...field} />
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
                    <FormLabel>*Floor</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Floor" {...field} />
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
                    <FormLabel>*Apartment</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Apartment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Save and Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingBillingsDetails;
