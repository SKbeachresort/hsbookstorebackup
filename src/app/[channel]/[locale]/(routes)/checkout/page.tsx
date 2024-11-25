"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckOutStepper from "@/components/Checkout/CheckOutStepper";
import ShippingBillingsDetails from "@/components/Checkout/ShippingBillingsDetails";
import { ReviewOrder } from "@/components/Checkout/ReviewOrder";
import { SelectPaymentMethod } from "@/components/Checkout/SelectPaymentMethod";
import { OrderPlacedStatus } from "@/components/Checkout/OrderPlacedStatus";
import { PlaceOrderWidget } from "@/components/Checkout/PlaceOrderWidget";
import { useCart } from "@/context/CartContext";
import { totalmem } from "os";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  const handleNext = () => {
    if (!isFinalStep) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === stepContent.length - 2) {
      setCurrentStep((prev) => prev + 1); 
    }
  };

  const steps = [
    "Shipping & Billing Details",
    "Review Order",
    "Select Payment Method",
    "Order Placed",
  ];

  const stepContent = [
    <ShippingBillingsDetails onNext={handleNext} />,
    <ReviewOrder />,
    <SelectPaymentMethod />,
    <OrderPlacedStatus />,
  ];

  const isSecondLastStep = currentStep === stepContent.length - 2;
  const isFinalStep = currentStep === stepContent.length - 1;

  return (
    <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      <CheckOutStepper steps={steps} currentStep={currentStep} />

      <div className="relative flex-col flex md:flex-row justify-between ">
        <div className="md:w-[55%] lg:w-[67%] py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {stepContent[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:w-[40%] lg:w-[28%] h-auto">
          <div className="sticky top-4 py-5">
            {!isFinalStep && (
              <PlaceOrderWidget
                totalAmount={totalAmount}
                cartItems={cartItems}
                currentStep={currentStep}
                isSecondLastStep={isSecondLastStep}
                onNext={handleNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
