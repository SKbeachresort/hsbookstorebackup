"use client";
import React, { useState, useEffect } from "react";
import { executeGraphQL } from "@/lib/graphql";
import { localeToEnum } from "@/lib/regions";
import { CompleteCheckoutDocument } from "../../../../../../../../../gql/graphql";
import { useCompleteCheckoutMutation } from "../../../../../../../../../gql/graphql";
import { useParams } from "next/navigation";
import ProcessingOrder from "@/components/Checkout/ProcessingOrder";
import CheckOutStepper from "@/components/Checkout/CheckOutStepper";
import ShippingBillingsDetails from "@/components/Checkout/ShippingBillingsDetails";
import { ReviewOrder } from "@/components/Checkout/ReviewOrder";
import { SelectPaymentMethod } from "@/components/Checkout/SelectPaymentMethod";
import OrderPlacedStatus from "@/components/Checkout/OrderPlacedStatus";
import { setCookie } from "cookies-next";

type CheckoutProps = {
  params: {
    channel: string;
    locale: string;
    checkoutID: string;
    sessionId: string;
  };
};

const ConfirmOrderPage = () => {
  const { checkoutID, sessionId, locale, channel } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentStatusError, setPaymentStatusError] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(2);

  if (!sessionId) {
    <>
      <div className="h-72 flex flex-col justify-center items-center">
        <p className="text-lg text-red-500 my-10">Checkout Session Not Found</p>
      </div>
    </>;
    return;
  }

  const [completeCheckout, { data, error, loading: mutationLoading }] =
    useCompleteCheckoutMutation();

  useEffect(() => {
    if (sessionId && checkoutID) {
      completeCheckout({
        variables: {
          paymentData: JSON.stringify({
            session_id: sessionId,
          }),
          checkoutId: checkoutID as string,
        },
      })
        .then((response) => {
          console.log("Complete Checkout", response);
          if (response.data?.checkoutComplete) {
            const order = response.data?.checkoutComplete.order;
            if (order?.number) {
              setOrderId(order.number);
            }
            if (order?.paymentStatus === "FULLY_CHARGED") {
              setOrderSuccess(true);
              setCurrentStep(3);
              localStorage.removeItem("cartItems");
              setCookie("cartItems", "", { maxAge: -1 });
            } else {
              setPaymentStatusError(true);
            }
          } else {
            setOrderSuccess(false);
          }
        })
        .catch((err) => {
          console.error("Error completing checkout:", err);
          setOrderSuccess(false);
          setPaymentStatusError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sessionId, checkoutID, completeCheckout]);

  const handleNext = () => {
    if (!isFinalStep) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === stepContent.length - 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    "Shipping & Billing Details",
    "Review Details",
    "Payment Details",
    "Order Placed",
  ];

  const stepContent = [
    <ShippingBillingsDetails onNext={handleNext} />,
    <ReviewOrder onBack={handleBack} onNext={handleNext} />,
    <SelectPaymentMethod
      onBack={handleBack}
      onNext={handleNext}
      locale={locale as string}
      channel={channel as string}
    />,
    <OrderPlacedStatus />,
  ];

  const isSecondLastStep = currentStep === stepContent.length - 2;
  const isFinalStep = currentStep === stepContent.length - 1;

  return (
    <div>
      <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      <CheckOutStepper steps={steps} currentStep={currentStep} />
        {loading ? (
          <div className="text-center mt-10">
            <ProcessingOrder />
          </div>
        ) : (
          <div className="text-center mt-10">
            {orderSuccess ? (
              <OrderPlacedStatus orderId={orderId} />
            ) : paymentStatusError ? (
              <h2 className="text-xl font-semibold text-red-600">
                Cannot proceed with your order. Payment not fully charged.
              </h2>
            ) : (
              <h2 className="text-xl font-semibold text-red-600">
                There was an error processing your order.
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
