"use client";
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const OrderPlacedStatus = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">

      <FaCheckCircle className="text-5xl text-center text-green-600 my-4" />
      <h1 className="text-xl text-center my-2">Order Placed Successfully</h1>
      
    </div>
  );
};

export default OrderPlacedStatus;