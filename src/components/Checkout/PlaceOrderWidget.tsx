"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/elements/Loader";
import { useRegions } from "@/context/RegionProviders";
import { useCheckoutPaymentCreateMutation } from "../../../gql/graphql";
import { usePaymentInitializeMutation } from "../../../gql/graphql";
import toast from "react-hot-toast";

interface PlaceOrderWidgetProps {
  channel: string;
  locale: string;
  totalAmount: number;
  cartItems: any[];
  currentStep: number;
  isSecondLastStep: boolean;
  onNext: () => void;
};

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
  const shippingDetails = JSON.parse(
    localStorage.getItem("shippingMethodId") || "{}"
  );
  // console.log("Shipping Details", shippingDetails);

  const shippingName = shippingDetails?.name || "";
  const shippingFee = shippingDetails?.price?.amount || 0;

  const [checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();
  const [paymentInitialize] = usePaymentInitializeMutation();

  const CurrencyCode = currentChannel?.currencyCode;
  const TotatalPaybleAmount = totalAmount + shippingFee;

  const disabled = currentStep == 0 || ( currentStep == 2 && paymentMethod === "credit-card");

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
      console.log("Checout Id in Select Payment Method", checkoutID);
      console.log("Payment Method in Select Payment Method", paymentMethod);
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

    if (paymentMethod === "debit-card") {
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
              paymentInitializeResponse.data.paymentInitialize
                .initializedPayment.data
            ).PaymentURL
          : null;

        if (paymentURL) {
          window.location.href = paymentURL;
        } else {
          console.error("Payment URL not found in the response");
        }
      } catch (error) {
        console.log("Error creating payment", error);
      }
      return;
    };

    if (paymentMethod === "credit-card") {
      // try {
      //   const createPaymentResponse = await checkoutPaymentCreate({
      //     variables: {
      //       checkoutId: checkoutID,
      //       paymentInput: { gateway: "myfatoorah" },
      //     },
      //   });
      //   console.log("Checkout ", createPaymentResponse);

      //   const paymentInitializeResponse = await paymentInitialize({
      //     variables: {
      //       checkoutId: checkoutID,
      //       paymentData: paymentData,
      //       gateway: "myfatoorah",
      //       gatewayFlag: gatewayFlag,
      //       embeddedFlag: embeddedFlag,
      //       channel: channel,
      //     },
      //   });
      //   console.log("Payment Initialize", paymentInitializeResponse);
      //   const SessionId = paymentInitializeResponse?.data?.paymentInitialize
      //     ?.initializedPayment?.data
      //     ? JSON.parse(
      //         paymentInitializeResponse.data.paymentInitialize
      //           .initializedPayment.data
      //       ).SessionId
      //     : null;
      //   console.log("Session ID", SessionId);
      //   const redirectURL = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/checkout/${checkoutID}/execute-payment/${SessionId}`;
      //   if (SessionId) {
      //     window.location.href = redirectURL;
      //   }
      // } catch (error) {
      //   console.log("Error creating payment", error);
      // }
      toast.error("Enter Credentials");
      setLoading(false);
      return;
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
              Shipping {shippingDetails ? `(${shippingName})` : ""}
            </span>
            <span className="text-secondary text-xs">
              {CurrencyCode}{" "}
              {shippingDetails ? `${shippingFee?.toFixed(3)}` : "0"}
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
          } ${disabled ? "cursor-not-allowed bg-opacity-60" : ""}`}
          disabled={disabled}
        >
          {loading ? (
            <Loader />
          ) : isSecondLastStep ? (
            `${
              paymentMethod !== "cash-on-delivery"
                ? "Continue to Payment"
                : "Place Order"
            }`
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </>
  );
};
