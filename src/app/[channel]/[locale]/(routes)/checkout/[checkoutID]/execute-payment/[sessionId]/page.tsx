"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckOutStepper from "@/components/Checkout/CheckOutStepper";
import ShippingBillingsDetails from "@/components/Checkout/ShippingBillingsDetails";
import { ReviewOrder } from "@/components/Checkout/ReviewOrder";
import { SelectPaymentMethod } from "@/components/Checkout/SelectPaymentMethod";
import OrderPlacedStatus from "@/components/Checkout/OrderPlacedStatus";
import { PlaceOrderWidget } from "@/components/Checkout/PlaceOrderWidget";
import { useCart } from "@/context/CartContext";
import { useSearchParams, useParams } from "next/navigation";
import dynamic from "next/dynamic";
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

const ExecutePayment = () => {
  const { channel, locale, checkoutID, sessionId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (sessionId) {
      setCurrentStep(3);
    }
  }, [sessionId]);

  const countryCode = "KWT";

  if (!sessionId) {
    <div className="h-72 flex flex-col justify-center items-center">
      <p className="text-lg text-red-500 my-10">Checkout Session Not Found</p>
    </div>;
    return;
  };

  return (
    <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      
      <CheckoutComplete
        initialSession={sessionId as string}
        countryCode={countryCode}
        checkoutId={checkoutID as string}
        locale={locale as string}
        channel={channel as string}
      />
    </div>
  );
};

export default ExecutePayment;
