"use client";
import InputField from "@/app/elements/InputField";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const ViaCreditCard = () => {
  return (
    <div className="md:w-[50%]">
      <h1 className="my-3 text-lg font-semibold">Payment Details</h1>

      <div>
        <InputField
          label="*Card Number"
          type="text"
          placeholder="Enter Card Number"
        />
        <InputField
          label="*Name on Card"
          type="text"
          placeholder="Enter Name on Card"
        />

        <div className="flex flex-row gap-4">
          <InputField label="*Expiry Month" type="text" placeholder="Month" />
          <InputField
            label="*Expiry Year"
            type="text"
            placeholder="Expiry Year"
          />
        </div>

        <div className="w-[50%]">
          <InputField
            label="*Security Code CVV/CVC"
            type="text"
            placeholder="Enter CVV"
          />
        </div>
      </div>

      <div className="flex items-center my-5">
        <Checkbox />
        <span className="ml-2">Use this as my default payment option</span>
      </div>    


    </div>
  );
};
