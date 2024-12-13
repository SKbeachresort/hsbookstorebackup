"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { getCookie } from "cookies-next";
import ordersuccess from "../../../public/orderplaced.json";

const OrderPlacedStatus = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <Lottie
        animationData={ordersuccess}
        loop={false}
        className="w-40 mx-auto"
      />
      <h1 className="text-xl text-center my-2">Your Order Placed Successfully</h1>
    </div>
  );
};

export default OrderPlacedStatus;
