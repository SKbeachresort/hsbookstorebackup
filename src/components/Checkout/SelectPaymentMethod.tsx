"use client";
import React, { useState, useEffect } from "react";
import RadioButton from "@/app/elements/RadioButton";
import Image from "next/image";
import visa from "../../../public/Visa.png";
import mastercard from "../../../public/mastercard.png";
import debitcard from "../../../public/debitcard.png";
import cod from "../../../public/cod.jpg";
import { ViaCreditCard } from "./paymentmode/ViaCreditCard";
import { ViaDebitCard } from "./paymentmode/ViaDebitCard";
import { ViaCashOnDelivery } from "./paymentmode/ViaCashOnDelivery";
import { IoArrowBackOutline } from "react-icons/io5";

interface SelectPaymentMethodProps {
  locale: string;
  channel: string;
  onBack: () => void;
  onNext: () => void;
};

export const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = ({
  locale,
  channel,
  onBack,
  onNext,
}) => {
  const shippingAddress = localStorage.getItem("shippingAddress");

  const parsedShippingAddress = shippingAddress
    ? JSON.parse(shippingAddress)
    : null;
  const CurrentCountry = parsedShippingAddress?.country.country;
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  useEffect(() => {
    const savedPaymentMethod =
      localStorage.getItem("selectedPaymentMethod") ||
      (CurrentCountry === "Kuwait" ? "debit-card" : "credit-card");
    setSelectedPaymentMethod(savedPaymentMethod);
  }, [CurrentCountry]);

  useEffect(() => {
    if (selectedPaymentMethod) {
      localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
    }
  }, [selectedPaymentMethod]);

  const handleRadioChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const paymentOptions =
    CurrentCountry === "Kuwait"
      ? [
          {
            label: "Pay with Debit Card",
            value: "debit-card",
            icon: debitcard,
          },
          {
            label: "Pay with Credit Card",
            value: "credit-card",
            icon: visa,
            icon2: mastercard,
          },
          { label: "Cash on Delivery", value: "cash-on-delivery", icon: cod },
        ]
      : [
          {
            label: "Pay with Credit Card",
            value: "credit-card",
            icon: visa,
            icon2: mastercard,
          },
          {
            label: "Pay with Debit Card",
            value: "debit-card",
            icon: debitcard,
          },
          { label: "Cash on Delivery", value: "cash-on-delivery", icon: cod },
        ];

  return (
    <div>
      <div className="top-10 z-20">
        <button onClick={onBack}>
          <IoArrowBackOutline className="text-secondary text-xl" />
        </button>
      </div>

      <h1 className="text-lg font-semibold mb-3">Select Payment Method</h1>

      {/* Render Payment Options */}
      <div className="flex flex-row justify-between">
        {paymentOptions.map((option) => (
          <div
            key={option.value}
            className={`w-[32%] border-2 ${
              selectedPaymentMethod === option.value
                ? "border-secondary"
                : "border-disableGray"
            } rounded-lg p-2`}
          >
            <RadioButton
              label={option.label}
              name="options"
              value={option.value}
              checked={selectedPaymentMethod === option.value}
              onChange={handleRadioChange}
            />
            <div className="flex flex-row my-2 space-x-2 ml-8">
              <Image
                src={option.icon}
                alt={option.value}
                width={40}
                height={32}
              />
              {option.icon2 && (
                <Image
                  src={option.icon2}
                  alt={`${option.value}-secondary`}
                  width={40}
                  height={32}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Mode */}
      <div className="mt-5">
        {selectedPaymentMethod === "credit-card" && <ViaCreditCard channel={channel} locale={locale}/>}
        {selectedPaymentMethod === "debit-card" && <ViaDebitCard />}
        {selectedPaymentMethod === "cash-on-delivery" && <ViaCashOnDelivery />}
      </div>
    </div>
  );
};
