"use client";
import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import processloading from "../../../../public/processloading.json";

const ProcessingPayment = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <Lottie
        animationData={processloading}
        loop={true}
        className="w-40 mx-auto"
      />
      <h2 className="text-xl font-semibold">Processing Order...</h2>
      <p>Please wait while we process your order.</p>
    </div>
  );
};

export default ProcessingPayment;