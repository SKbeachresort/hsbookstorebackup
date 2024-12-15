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

import { CheckoutProps } from "./CreditCardCheckout";
import OrderPlacedStatus from "../OrderPlacedStatus";

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

  const [checkoutComplete, { loading, data, error }] =
    useCompleteCheckoutMutation({
      onCompleted(data) {
        if (
          data &&
          data.checkoutComplete &&
          data.checkoutComplete.errors &&
          data.checkoutComplete.errors.length > 0
        ) {
          toast.error(
            "Something went wrong with the payment provider, please contact with us"
          );
          return;
        }
        deleteCookie("otpUrl");
        setCheckoutId("");
        setCookie(`checkoutId-${channel}`, "");
      },

      refetchQueries: () => [
        {
          query: UserDocument,
          variables: {},
        },
        {
          query: CheckoutFindDocument,
          variables: {
            id: checkoutId,
            locale: localeToEnum(locale),
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

  return (
    <div className="my-8 flex min-h-[calc(100dvh-133px)] w-full flex-col items-center justify-center gap-6">
      {billIframe && billIframe !== "" ? (
        <div className="flex flex-col items-center justify-center my-10">
          <ProcessingOrder />
        </div>
      ) : (
        <div id="otp-iframe" className="mx-4 w-full">
          <iframe src={iframeSrc} width="100%" height="100vh"></iframe>
        </div>
      )}

      {data && data.checkoutComplete && data.checkoutComplete.order && user ? (
        <div className="flex flex-col justify-center items-center my-10">
          <OrderPlacedStatus orderId={data.checkoutComplete.order.id} />
        </div>
      ) : null}
    </div>
  );
};

export default Secure3Dcode;
