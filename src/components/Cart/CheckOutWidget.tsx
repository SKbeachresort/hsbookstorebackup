"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import CreateAccount from "../Authentication/CreateAccount";
import { useRegions } from "@/context/RegionProviders";

interface CheckOutWidgetProps {
  locale: string;
  channel: string;
  totalAmount: number;
  cartItems: any[];
};

export const CheckOutWidget: React.FC<CheckOutWidgetProps> = ({
  locale,
  channel,
  totalAmount,
  cartItems,
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

  const CurrencyCode = currentChannel?.currencyCode;

  return (
    <>
      <div className="bg-white border-[1px] border-borderColor p-4 shadow rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>

        <div className="mb-2">
          <div className="flex justify-between">
            <span className="text-md">Subtotal ({cartItems.length} items)</span>
            <span>
              {CurrencyCode} {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          <div className="flex justify-between my-2">
            <span className="text-xstext-textgray">Shipping</span>
            <span className="text-green-600 font-semibold text-xs">Free</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-xs">Taxes</span>
            <span className="text-xs">Calculated at checkout</span>
          </div>
        </div>

        <hr />
        <div className="my-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>
              {CurrencyCode} {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        </div>
        <hr />

        {/* <Link href="/checkout"> */}
        <button
          onClick={openModal}
          className="w-full flex flex-col items-center justify-center mt-4 py-2 text-md bg-secondary text-white font-semibold rounded-full"
        >
          {loading ? <Loader /> : <>Checkout</>}
        </button>
        {/* </Link> */}

        <div className="text-sm mt-2 underline">
          For the best experience{" "}
          <a href="#" className="ml-2 font-semibold text-secondary">
            Sign in
          </a>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isLogin} onClose={closeModal}>
        <CreateAccount
          closeModal={closeModal}
          channel={channel}
          locale={locale}
        />
      </Modal>
    </>
  );
};