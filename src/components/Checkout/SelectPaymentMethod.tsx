"use client";
import React, { useState } from "react";
import RadioButton from "@/app/elements/RadioButton";
import Image from "next/image";
import visa from "../../../public/Visa.png";
import mastercard from "../../../public/mastercard.png";
import debitcard from "../../../public/debitcard.png";
import cod from "../../../public/cod.jpg";
import { ViaCreditCard } from "./paymentmode/ViaCreditCard";
import { ViaDebitCard } from "./paymentmode/ViaDebitCard";
import { ViaCashOnDelivery } from "./paymentmode/ViaCashOnDelivery";

export const SelectPaymentMethod = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  const handleRadioChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  return (
    <div className="">
      <h1 className="text-lg font-semibold mb-3">Select Payment Method</h1>

      {/* Select Payment Option */}
      <div className="flex flex-row justify-between">
        <div
          className={`w-[32%] border-2 ${
            selectedPaymentMethod === "credit-card"
              ? " border-secondary"
              : "border-disableGray"
          } rounded-lg p-2`}
        >
          <RadioButton
            label="Pay with Credit Card   "
            name="options"
            value="credit-card"
            checked={selectedPaymentMethod === "credit-card"}
            onChange={handleRadioChange}
          />

          <div className="flex flex-row my-2 space-x-2 ml-8">
            <Image src={visa} alt="visa" width={40} height={32} />
            <Image src={mastercard} alt="mastercard" width={40} height={32} />
          </div>
        </div>

        <div
          className={`w-[32%] border-2 ${
            selectedPaymentMethod === "debit-card"
              ? " border-secondary"
              : "border-disableGray"
          } rounded-lg p-2`}
        >
          <RadioButton
            label="Pay with Debit Card   "
            name="options"
            value="debit-card"
            checked={selectedPaymentMethod === "debit-card"}
            onChange={handleRadioChange}
          />
          <div className="flex flex-row my-2 space-x-2 ml-8">
            <Image src={debitcard} alt="debitcard" width={40} height={32} />
          </div>
        </div>

        <div
          className={`w-[32%] border-2 ${
            selectedPaymentMethod === "cash-on-delivery"
              ? " border-secondary"
              : "border-disableGray"
          } rounded-lg p-2`}
        >
          <RadioButton
            label="Cash on Delivery   "
            name="options"
            value="cash-on-delivery"
            checked={selectedPaymentMethod === "cash-on-delivery"}
            onChange={handleRadioChange}
          />
          <div className="flex flex-row my-2 space-x-2 ml-8">
            <Image src={cod} alt="cod" width={80} height={32} />
          </div>
        </div>
      </div>

      {/* Payment Mode */}
      <div className="mt-5">
        {selectedPaymentMethod === "credit-card" && <ViaCreditCard />}
        {selectedPaymentMethod === "debit-card" && <ViaDebitCard />}
        {selectedPaymentMethod === "cash-on-delivery" && <ViaCashOnDelivery />}
      </div>
    </div>
  );
};
