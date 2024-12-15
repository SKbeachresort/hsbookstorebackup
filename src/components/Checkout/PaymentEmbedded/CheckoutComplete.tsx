"use client";
import React from "react";
import { getCookie } from "cookies-next";
import Secure3Dcode from "./Secure3Dcode";

interface CheckoutCompleteProps {
  channel: string;
  initialSession: string;
  countryCode: string;
  checkoutId: string;
  locale: string;
};

const CheckoutComplete: React.FC<CheckoutCompleteProps> = ({
  initialSession,
  countryCode,
  checkoutId,
  locale,
  channel,
}) => {

  const otpURL = getCookie("otpUrl")

  if (!otpURL) {
    return (
      <div className="flex flex-col items-center justify-center h-72">
        <p className="text-lg font-semibold text-red-500">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  };

  return (
    <div className="my-6 flex flex-col place-items-center">
      <Secure3Dcode
        initialSession={initialSession}
        countryCode={countryCode}
        checkoutId={checkoutId}
        iframeSrc={otpURL as string}
        locale={locale}
        channel={channel}
      />
    </div>
  );
};

export default CheckoutComplete;