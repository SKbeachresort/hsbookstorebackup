"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import CreateAccount from "../Authentication/CreateAccount";
import { useRegions } from "@/context/RegionProviders";

interface PlaceOrderWidgetProps {
  channel: string;
  locale: string;
  totalAmount: number;
  cartItems: any[];
  currentStep: number;
  isSecondLastStep: boolean;
  onNext: () => void;
}

export const PlaceOrderWidget: React.FC<PlaceOrderWidgetProps> = ({
  channel,
  locale,
  totalAmount,
  cartItems,
  currentStep,
  isSecondLastStep,
  onNext,
}) => {

  const { currentChannel } = useRegions();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLogin(true);
    }, 2000);
  };

  const closeModal = () => {
    setIsLogin(false);
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500);
  };

  const CurrencyCode = currentChannel?.currencyCode;

  return (
    <>
      <div className="bg-white border-[1px] border-borderColor p-4 shadow rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>

        <div className="mb-2">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal ({cartItems.length} items)</span>
            <span>
              {CurrencyCode} {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-xs text-textgray">Shipping</span>
            <span className="text-secondary text-xs">Free</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-xs">Taxes</span>
            <span className="text-xs">Calculated at checkout</span>
          </div>
        </div>

        <hr />
        <div className="my-2">
          <div className="flex justify-between font-bold text-md">
            <span>Total</span>
            <span>
              {CurrencyCode} {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        </div>
        <hr />

        {/* <Link href="/checkout"> */}
        <button
          onClick={handleNext}
          className={`w-full flex flex-col items-center justify-center mt-4 py-2 text-sm font-semibold rounded-full ${
            currentStep === 0
              ? "bg-white border-[1px] border-textgray text-textColor"
              : "bg-secondary text-white"
          }`}
          disabled={currentStep == 0}
        >
          {loading ? <Loader /> : isSecondLastStep ? "Place Order" : "Checkout"}
        </button>
        {/* </Link> */}

        <div className="text-xs mt-2 underline">
          For the best experience{" "}
          <a href="#" className="ml-1 font-semibold text-secondary">
            Sign in
          </a>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isLogin} onClose={closeModal}>
        <CreateAccount closeModal={closeModal} channel={channel} locale={locale}/>
      </Modal>
    </>
  );
};
