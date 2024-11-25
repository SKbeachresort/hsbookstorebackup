"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bus from "../../../public/bus.png";

const DeliveryAddressCard: React.FC = () => {
  return (
    <div className="mb-4">
      <div className="border-[1px] p-4 rounded-2xl border-borderColor">
        <div className="flex flex-row items-center gap-2 mb-2 text-lg">
          <Image src={bus} width={40} height={10} alt="truck" className=""/>
          <h3 className="font-semibold text-lg">Delivery details</h3>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
            <p className="text-sm font-semibold my-2">Shipping arrives on: June 5</p>
            <p className="text-secondary underline font-semibold text-xs">Change Delivery Date</p>
        </div>
        
        <p className="text-sm text-textgray my-1">* for orders made by 4pm</p>
        <p className="text-xs text-textgray">ID 456789</p>
      </div>
    </div>
  );
};

export default DeliveryAddressCard;