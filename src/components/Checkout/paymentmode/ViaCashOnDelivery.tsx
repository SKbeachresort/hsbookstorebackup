import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const ViaCashOnDelivery = () => {
  return (
    <div className="my-2 border-[1px] border-disableGray p-5 rounded-md">
      <h1 className="mb-3 text-lg font-semibold">Delivery Address</h1>
      <div className="text-textgray mb-2">
        <p className="text-sm">Kuwait, Kuwait City, Faiha</p>
        <p className="text-sm">Mohhammad Al Adwani</p>
        <p className="text-sm">
          Street Address Details, Block, Avenue, Street, Floor Apartment
        </p>
      </div>
      <p className="underline text-secondary text-sm">change address</p>

      <div className="flex items-center my-4">
        <Checkbox />
        <span className="ml-2 text-sm text-textgray">Confirm Delivery Address</span>
      </div>
    </div>
  );
};