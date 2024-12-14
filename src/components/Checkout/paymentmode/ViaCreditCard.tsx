"use client";
import InputField from "@/app/elements/InputField";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useCheckoutPaymentCreateMutation } from "../../../../gql/graphql";
import { usePaymentInitializeMutation } from "../../../../gql/graphql";

type FormValues = {
  cardNumber: string;
  nameOnCard: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  defaultPayment: boolean;
};

export const ViaCreditCard = () => {
  const [showForm, setShowForm] = useState(false);
  const checkoutID = localStorage.getItem("checkoutID");

  const form = useForm<FormValues>({
    defaultValues: {
      cardNumber: "",
      nameOnCard: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      defaultPayment: false,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  const [checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();
  const [paymentInitialize] = usePaymentInitializeMutation();

  const handleContinueClick = async() => {
    setShowForm(true);
  };

  return (
    <div className="md:w-[50%]">
      {/* {!showForm ? (
        <div className="flex justify-center">
          <button
            onClick={handleContinueClick}
            className="px-4 py-2 bg-secondary text-white font-semibold rounded"
          >
            Continue to Card Details
          </button>
        </div>
      ) : ( */}
        <>
          <h1 className="my-3 text-lg font-semibold">Payment Details</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Card Number */}
              <FormField
                name="cardNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Card Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Card Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name on Card */}
              <FormField
                name="nameOnCard"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Name on Card</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Name on Card"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry Month and Year */}
              <div className="flex flex-row gap-4">
                <FormField
                  name="expiryMonth"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="MM/YY"
                          onChange={(e) => {
                            const value = e.target.value;
                            const formattedValue = value
                              .replace(/[^0-9/]/g, "")
                              .replace(/(\d{2})(\d)/, "$1/$2")
                              .substring(0, 5);
                            field.onChange(formattedValue);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* CVV */}
              <FormField
                name="cvv"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>*Security Code CVV/CVC</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Enter CVV" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Default Payment Checkbox */}
              <div className="flex items-center my-5">
                <FormField
                  name="defaultPayment"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span className="ml-2">
                        Use this as my default payment option
                      </span>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
              >
                Submit Payment Details
              </button>
            </form>
          </Form>
        </>
      {/* )} */}
    </div>
  );
};
