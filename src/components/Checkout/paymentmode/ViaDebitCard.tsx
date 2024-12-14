"use client";
import React from "react";
import InputField from "@/app/elements/InputField";
import { Checkbox } from "@/components/ui/checkbox";

export const ViaDebitCard = () => {
  return (
    <div className="md:w-[50%]">
      <div className="bg-disableGray p-4 my-3">
        <span className="font-semibold">
          You will be redirected to the KNET payment gateway to finish payment
        </span>
      </div>
    </div>
  );
};