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
import { useCompleteCheckoutMutation } from "../../../../../../../gql/graphql";

const CheckoutStatus = () => {
  const { channel, locale, checkoutID } = useParams();
  console.log("Checkout ID at CheckoutStatus", checkoutID);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");
  const paymentId = searchParams.get("paymentId");

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentStatusError, setPaymentStatusError] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (paymentStatus === "success") {
      setCurrentStep(3);
    }
  }, [paymentStatus]);

  const [completeCheckout, { data, error, loading: mutationLoading }] =
    useCompleteCheckoutMutation();

  useEffect(() => {
    if (paymentStatus === "success" && paymentId && checkoutID) {
      completeCheckout({
        variables: {
          paymentData: JSON.stringify({
            gateway: "True",
            payment_id: paymentId,
          }),
          checkoutId: checkoutID as string,
        },
      })
        .then((response) => {
          console.log("Complete Checkout", response);
          if (response.data?.checkoutComplete) {
            const order = response.data?.checkoutComplete.order;
            if (order?.paymentStatus === "FULLY_CHARGED") {
              setOrderSuccess(true);
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
  }, [paymentStatus, paymentId, checkoutID, completeCheckout]);

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
    <SelectPaymentMethod onBack={handleBack} onNext={handleNext} />,
    <OrderPlacedStatus />,
  ];

  const isSecondLastStep = currentStep === stepContent.length - 2;
  const isFinalStep = currentStep === stepContent.length - 1;

  return (
    <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      <CheckOutStepper steps={steps} currentStep={currentStep} />

      <div className="flex flex-col justify-center items-center my-20">
        {loading ? (
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold">Processing Order...</h2>
            <p>Please wait while we process your order.</p>
          </div>
        ) : (
          <div className="text-center mt-10">
            {orderSuccess ? (
              <OrderPlacedStatus />
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

export default CheckoutStatus;
