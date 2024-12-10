"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import InputField from "@/app/elements/InputField";
import CustomButton from "@/app/elements/Button";

interface ShippingDetailsProps {
  onNext: () => void;
}

const ShippingBillingsDetails: React.FC<ShippingDetailsProps> = ({
  onNext,
}) => {
  const { cartItems } = useCart();

  const [loading, setLoading] = useState(false);

  const handleSaveAndContinue = () => {
    onNext();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold my-3">
        Checkout ({cartItems.length} items){" "}
      </h1>

      <div className="w-[90%] md:w-[70%] lg:w-[60%]">
        <h1 className="text-md font-semibold">1. Shipping Address</h1>

        <div className="my-4">
          <InputField label="*Country /Label" value="Kuwait" />
        </div>

        <div className="my-4">
          <InputField label="*City" value="Kuwait City" />
        </div>

        <div className="my-4">
          <InputField label="*Area" value="Faiha" />
        </div>

        <div className="my-4">
          <InputField
            label="*Full Name (First and Last Name)"
            placeholder="Enter name"
          />
        </div>

        <div className="my-4">
          <InputField label="*Address (Line1)" placeholder="Enter Address" />
        </div>

        <div className="flex flex-row justify-between gap-4 my-4">
          <div className="w-[48%]">
            <InputField label="*Block" placeholder="Enter Block" />
          </div>
          <div className="w-[48%]">
            <InputField label="*Street" placeholder="Enter Street" />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 my-4">
          <div className="w-[48%]">
            <InputField label="*Floor" placeholder="Enter Floor" />
          </div>
          <div className="w-[47%]">
            <InputField label="*Apartment" placeholder="Enter Apartment" />
          </div>
        </div>

        <div className="my-4">
          <InputField label="*Phone Number" placeholder="Enter Phone Number" />
        </div>

        <div className="my-4">
          <p className="text-sm font-medium text-black mb-1">More Detailss</p>
          <textarea
            name=""
            id=""
            placeholder="Enter More Details"
            className="w-full border-[1px] border-textgray rounded-lg p-2 outline-none"
            rows={5}
          ></textarea>
        </div>

        <CustomButton
          children="Save and Continue"
          isLoading={loading}
          onClick={handleSaveAndContinue}
        />
      </div>
    </div>
  );
};

export default ShippingBillingsDetails;
