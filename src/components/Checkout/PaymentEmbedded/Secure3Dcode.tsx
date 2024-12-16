"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CompleteCheckoutDocument,
  CheckoutFindDocument,
  UserDocument,
  useCompleteCheckoutMutation,
} from "../../../../gql/graphql";
import { useUser } from "@/hooks/useUser";
import { localeToEnum } from "@/lib/regions";
import { deleteCookie, setCookie } from "cookies-next";
import { IoBagCheck } from "react-icons/io5";
import { useLocalStorage } from "react-use";
import toast from "react-hot-toast";
import ProcessingOrder from "../ProcessingOrder";
import { LanguageCodeEnum } from "../../../../gql/graphql";

import { CheckoutProps } from "./CreditCardCheckout";
import CheckOutStepper from "@/components/Checkout/CheckOutStepper";
import ShippingBillingsDetails from "@/components/Checkout/ShippingBillingsDetails";
import { ReviewOrder } from "@/components/Checkout/ReviewOrder";
import { SelectPaymentMethod } from "@/components/Checkout/SelectPaymentMethod";
import OrderPlacedStatus from "@/components/Checkout/OrderPlacedStatus";

const Secure3Dcode = ({
  initialSession,
  countryCode,
  iframeSrc,
  checkoutId,
  locale,
  channel,
}: CheckoutProps & {
  iframeSrc: string;
  channel: string;
}) => {
  const [billIframe, setBillIframe] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const [_checkoutId, setCheckoutId] = useLocalStorage<string>(
    `checkoutId-${channel}`
  );

  const [currentStep, setCurrentStep] = useState(2);

  console.log("Checkout Id", checkoutId);

  const [checkoutComplete, { loading, data, error }] =
    useCompleteCheckoutMutation({
      onCompleted(data) {
        if (
          data &&
          data.checkoutComplete &&
          data.checkoutComplete.errors &&
          data.checkoutComplete.errors.length > 0
        ) {
          console.log("Error", data.checkoutComplete.errors);
          toast.error(
            "Something went wrong with the payment provider, please contact with us"
          );
          return;
        }
        deleteCookie("otpUrl");
        setCheckoutId("");
        localStorage.removeItem("checkoutID");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("shippingMethodId");
        localStorage.removeItem("guestEmail");
        localStorage.removeItem("promoCodeDiscount");
        localStorage.removeItem("selectedPaymentMethod");
        localStorage.removeItem("shippingMethodSelectedId");
        setCookie("cartItems", "", { maxAge: -1 });
        setCookie(`checkoutId-${channel}`, "");
      },

      refetchQueries: () => [
        {
          query: UserDocument,
          variables: {
            locale: "EN_US" as LanguageCodeEnum,
          },
        },
        {
          query: CheckoutFindDocument,
          variables: {
            id: checkoutId,
            locale: "EN_US" as LanguageCodeEnum,
          },
        },
      ],
      awaitRefetchQueries: true,
    });

  useEffect(() => {
    if (window === undefined) return;
    window.addEventListener(
      "message",
      async function (event) {
        if (!event.data) return;
        try {
          const message = JSON.parse(event.data);
          if (message.sender == "MF-3DSecure") {
            const url = message.url;
            setBillIframe(url);
            await checkoutComplete({
              variables: {
                checkoutId,
                paymentData: JSON.stringify({
                  session_id: initialSession,
                }),
              },
            });
            setCurrentStep(3);
            localStorage.removeItem("checkoutID");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shippingAddress");
            localStorage.removeItem("shippingMethodId");
            localStorage.removeItem("guestEmail");
            localStorage.removeItem("promoCodeDiscount");
            localStorage.removeItem("selectedPaymentMethod");
            localStorage.removeItem("shippingMethodSelectedId");
            setCookie("cartItems", "", { maxAge: -1 });
            console.log("Checkout Complete", data);
          }
        } catch (error) {
          console.log(error);
          return;
        }
      },
      false
    );

    return () => {
      console.log("unmount");
    };
  }, []);

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
    <div className="my-2 h-full">
      <CheckOutStepper steps={steps} currentStep={currentStep} />

      {loading && (
        <div className="flex flex-col items-center justify-center">
          <ProcessingOrder />
        </div>
      )}

      {billIframe && billIframe !== "" ? (
        <div className="">{/* <ProcessingOrder /> */}</div>
      ) : (
        <div id="otp-iframe" className="mx-4 w-full h-full">
          <iframe src={iframeSrc} width="100%" height="100vh"></iframe>
        </div>
      )}

      {data?.checkoutComplete?.errors &&
        data?.checkoutComplete?.errors?.length > 0 && (
          <div className="text-red-500 text-center">
            <p>{data?.checkoutComplete?.errors[0]?.message}</p>
          </div>
        )}

      {data && data.checkoutComplete && data.checkoutComplete.order && user ? (
        <div className="flex flex-col justify-center items-center">
          <OrderPlacedStatus orderId={data.checkoutComplete.order.number} />
        </div>
      ) : null}
    </div>
  );
};

export default Secure3Dcode;
