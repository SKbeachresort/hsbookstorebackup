"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import CreateAccount from "../Authentication/CreateAccount";
import { useRegions } from "@/context/RegionProviders";
import { getUserDetails } from "@/hooks/getUser";
import { useIsAuthenticated } from "@/hooks/userIsAuthenticated";
import { useCheckoutShippingMethodUpdateMutation } from "../../../gql/graphql";
import { LanguageCodeEnum } from "../../../gql/graphql";
import { useCheckoutPaymentCreateMutation } from "../../../gql/graphql";
import { usePaymentInitializeMutation } from "../../../gql/graphql";
import { set } from "react-hook-form";

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
  const [loading, setLoading] = useState(false);
  const checkoutID = localStorage.getItem("checkoutID");
  const paymentMethod = localStorage.getItem("selectedPaymentMethod");

  const shippingMethodID = localStorage.getItem("shippingMethodSelectedId");
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [shippingName, setShippingName] = useState<string | null>(null);

  const [checkoutShippingMethodUpdate] =
    useCheckoutShippingMethodUpdateMutation();
  const [checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();
  const [paymentInitialize] = usePaymentInitializeMutation();

  useEffect(() => {
    console.log("Making API call with", { checkoutID, shippingMethodID });
    if (checkoutID && shippingMethodID) {
      setLoading(true);

      checkoutShippingMethodUpdate({
        variables: {
          id: checkoutID,
          deliveryMethodId: shippingMethodID,
          locale: "EN_US" as LanguageCodeEnum,
        },
      })
        .then((response) => {
          console.log("Shipping Method Updated", response);
          const TotalAmoutPayable =
            response.data?.checkoutDeliveryMethodUpdate?.checkout?.totalPrice
              ?.gross?.amount;

          const ShippingMethod =
            response.data?.checkoutDeliveryMethodUpdate?.checkout
              ?.deliveryMethod;
          if (ShippingMethod) {
            setShippingFee(
              ShippingMethod?.__typename === "ShippingMethod"
                ? ShippingMethod?.price?.amount
                : 0
            );
            setShippingName(
              ShippingMethod?.__typename === "ShippingMethod"
                ? ShippingMethod?.name
                : "Free"
            );
          }
        })
        .catch((error) => {
          console.log("Error updating shipping method", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [locale, checkoutShippingMethodUpdate]);

  const CurrencyCode = currentChannel?.currencyCode;
  const TotatalPaybleAmount = totalAmount + (shippingFee ?? 0);

  const handlePlaceOrder = async () => {
    if (!isSecondLastStep) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onNext();
        return;
      }, 2000);
      return;
    };

    if (!checkoutID || !paymentMethod) {
      console.log("Checkout ID or Payment Method not found");
      return;
    };

    setLoading(true);

    const gatewayFlag = paymentMethod === "debit-card" ? true : false;
    const embeddedFlag = paymentMethod === "credit-card" ? true : false;

    const paymentData = JSON.stringify({
      InvoiceAmount: TotatalPaybleAmount,
      CurrencyIso: CurrencyCode,
      RedirectDomain: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/`,
    });

    try {
      const createPaymentResponse = await checkoutPaymentCreate({
        variables: {
          checkoutId: checkoutID,
          paymentInput: { gateway: "myfatoorah" },
        },
      });
      console.log("Checkout ", createPaymentResponse);

      const paymentInitializeResponse = await paymentInitialize({
        variables: {
          checkoutId: checkoutID,
          paymentData: paymentData,
          gateway: "myfatoorah",
          gatewayFlag: gatewayFlag,
          embeddedFlag: embeddedFlag,
          channel: channel,
        },
      });
      console.log("Payment Initialize", paymentInitializeResponse);
      const paymentURL = paymentInitializeResponse?.data?.paymentInitialize
        ?.initializedPayment?.data
        ? JSON.parse(
            paymentInitializeResponse.data.paymentInitialize.initializedPayment
              .data
          ).PaymentURL
        : null;

      if (paymentURL) {
        window.location.href = paymentURL;
      } else {
        console.error("Payment URL not found in the response");
      };
    } catch (error) {
      console.log("Error creating payment", error);
    }
  };

  return (
    <>
      <div className="bg-white border-[1px] border-borderColor p-4 shadow rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>

        <div className="mb-2">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal ({cartItems.length} items)</span>
            <span>
              {CurrencyCode}{" "}
              {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-xs text-textgray">
              Shipping ({shippingName})
            </span>
            <span className="text-secondary text-xs">
              {CurrencyCode} {shippingFee?.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-xs">Taxes</span>
            <span className="text-xs">0</span>
          </div>
        </div>

        <hr />
        <div className="my-2">
          <div className="flex justify-between font-bold text-md">
            <span>Total</span>
            <span>
              {CurrencyCode}{" "}
              {TotatalPaybleAmount.toFixed(3).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            </span>
          </div>
        </div>
        <hr />

        {/* <Link href="/checkout"> */}
        <button
          onClick={handlePlaceOrder}
          className={`w-full flex flex-col items-center justify-center mt-4 py-2 text-sm font-semibold rounded-full ${
            currentStep === 0
              ? "bg-white border-[1px] border-textgray text-textColor"
              : "bg-secondary text-white"
          }`}
          disabled={currentStep == 0}
        >
          {loading ? <Loader /> : isSecondLastStep ? "Place Order" : "Checkout"}
        </button>
      </div>
    </>
  );
};