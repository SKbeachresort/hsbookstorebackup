"use client";
import React, { useState } from "react";
import CheckoutForm from "../PaymentEmbedded/CreditCardCheckout";

interface ViaCreditCardProps {
  locale: string;
  channel: string;
  checkoutID: string;
  paymentSessionId: string;
}

export const ViaCreditCard: React.FC<ViaCreditCardProps> = ({
  channel,
  locale,
  checkoutID,
  paymentSessionId,
}) => {
  return (
    <div className="md:w-[70%] lg:w-[60%] xl:w-[50%]">
      {paymentSessionId && (
        <CheckoutForm
          locale={locale}
          initialSession={paymentSessionId}
          countryCode={"KWT"}
          checkoutId={checkoutID}
        />
      )}
    </div>
  );
};
