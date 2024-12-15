"use client";
import dynamic from "next/dynamic";
import React from "react";

import CheckoutComplete from "@/components/Checkout/PaymentEmbedded/CheckoutComplete";
const CheckoutForm = dynamic(
  () => import("@/components/Checkout/PaymentEmbedded/CreditCardCheckout"),
  {
    ssr: false,
  }
);

type CheckoutProps = {
  params: {
    channel: string;
    locale: string;
    checkoutId: string;
    sessionId: string;
  };
  searchParams: { countryCode: string };
};

const ExecutePayment = ({
  params: { sessionId, checkoutId, locale, channel },
  searchParams: { countryCode = "KWT" },
}: CheckoutProps) => {

  if (!sessionId) {
    <div className="h-72 flex flex-col justify-center items-center">
      <p className="text-lg text-red-500 my-10">Checkout Session Not Found</p>
    </div>;
    return;
  };

  return (
    <div className="grid min-h-[calc(100dvh-164px)] w-full place-items-center">
      <CheckoutComplete
        initialSession={sessionId}
        countryCode={countryCode}
        checkoutId={checkoutId}
        locale={locale}
        channel={channel}
      />
    </div>
  );
};

export default ExecutePayment;