"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import CreateAccount from "../Authentication/CreateAccount";
import { useRegions } from "@/context/RegionProviders";
import { useUser } from "@/hooks/useUser";
import { useCheckoutCreateMutation } from "../../../gql/graphql";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getRegionUrl } from "@/utils/regionUrl";
import { setCookie } from "cookies-next";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const [checkout, { loading: checkoutLoading, data, error }] = useCheckoutCreateMutation();

  const { user, authenticated } = useUser();
  const router = useRouter();

  const openModal = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(true);
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProceedToCheckout = async () => {
    if (!authenticated) {
      openModal();
      return;
    };

    setIsLoading(true);

    const checkoutLines = cartItems.map((items) => ({
      quantity: items.quantity,
      variantId: items.variantId,
    }));

    const guestEmail = localStorage.getItem("guestEmail");

    const email = authenticated ? user?.email : guestEmail;

    try {
      const response = await checkout({
        variables: {
          lines: checkoutLines,
          email: email,
          channel: channel,
        },
      });

      const errors = response.data?.checkoutCreate?.errors;

      if (errors && errors.length > 0) {
        toast.error(`${errors[0].message}`);
      } else {
        const checkoutID = response.data?.checkoutCreate?.checkout?.id;
        console.log("Success: Checkout ID", checkoutID);

        if (checkoutID) {
          localStorage.setItem("checkoutID", checkoutID);
          setCookie("checkoutID", checkoutID, { maxAge: 7 * 24 * 60 * 60 });
          toast.success("Checkout Initiated!");
          router.push(getRegionUrl(channel, locale, `checkout`));
        };
      }
    } catch (error) {
      console.error("Checkout Error: ", error);
    }finally{
      setIsLoading(false);
    };
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
              {CurrencyCode}{" "}
              {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              {CurrencyCode}{" "}
              {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        </div>
        <hr />

        {/* <Link href="/checkout"> */}
        <button
          onClick={handleProceedToCheckout}
          className="w-full flex flex-col items-center justify-center mt-4 py-2 text-md bg-secondary text-white font-semibold rounded-full"
        >
          {isloading ? <Loader /> : <>Checkout</>}
        </button>
        {/* </Link> */}

        {authenticated && user ? (
          <>
            <div className="text-sm mt-2">
              Current User Signed:{" "}
              <span className="ml-2 font-semibold text-secondary">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="text-sm mt-2 underline">
              For the best experience{" "}
              <span
                onClick={openModal}
                className="ml-2 font-semibold text-secondary"
              >
                Sign in
              </span>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {!authenticated && isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CreateAccount
            closeModal={closeModal}
            channel={channel}
            locale={locale}
          />
        </Modal>
      )}
    </>
  );
};
