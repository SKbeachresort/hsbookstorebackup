"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { getCookie } from "cookies-next";
import ordersuccess from "../../../public/orderplaced.json";

interface OrderPlacedStatusProps {
  orderId?: string | null;
}

const OrderPlacedStatus: React.FC<OrderPlacedStatusProps> = ({ orderId }) => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <Lottie
        animationData={ordersuccess}
        loop={false}
        className="w-52 mx-auto"
      />
      <h1 className="text-xl fon-bold text-center my-2">
        Thank you for shopping with us!
      </h1>
      <p className="text-sm">
        Order Number <span className="font-semibold">#{orderId}</span> has been
        placed successfully
      </p>
      <p>We will short send you an email confirmation shortly.</p>
    </div>
  );
};

export default OrderPlacedStatus;
