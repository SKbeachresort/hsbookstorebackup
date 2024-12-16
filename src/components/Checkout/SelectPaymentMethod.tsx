import React, { useState, useEffect } from "react";
import RadioButton from "@/app/elements/RadioButton";
import Image from "next/image";
import visa from "../../../public/Visa.png";
import mastercard from "../../../public/mastercard.png";
import debitcard from "../../../public/debitcard.png";
import cod from "../../../public/cod.jpg";
import { ViaCreditCard } from "./paymentmode/ViaCreditCard";
import { ViaDebitCard } from "./paymentmode/ViaDebitCard";
import { ViaCashOnDelivery } from "./paymentmode/ViaCashOnDelivery";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRegions } from "@/context/RegionProviders";
import { useCheckoutPaymentCreateMutation } from "../../../gql/graphql";
import { usePaymentInitializeMutation } from "../../../gql/graphql";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

interface SelectPaymentMethodProps {
  locale: string;
  channel: string;
  onBack: () => void;
  onNext: () => void;
};

export const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = ({
  locale,
  channel,
  onBack,
  onNext,
}) => {

  const { cartItems } = useCart();
  const shippingAddress = localStorage.getItem("shippingAddress");
  const { currentChannel } = useRegions();

  const parsedShippingAddress = shippingAddress
    ? JSON.parse(shippingAddress)
    : null;

  const CurrentCountry = parsedShippingAddress?.country.country;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

  useEffect(() => {
    if (CurrentCountry === "Kuwait") {
      setSelectedPaymentMethod("debit-card");
    } else {
      setSelectedPaymentMethod("");
    };
  }, [CurrentCountry]);

  useEffect(() => {
    if (selectedPaymentMethod) {
      localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
    };
  }, [selectedPaymentMethod]);

  const handleRadioChange = (value: string) => {
    setSelectedPaymentMethod(value);
    if (value === "credit-card") {
      handleCreditCardClick();
    };
  };

  const shippingDetails = JSON.parse(
    localStorage.getItem("shippingMethodId") || "{}"
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  const shippingFee = shippingDetails?.price?.amount || 0;
  const DiscountAppliedAmount = parseFloat(localStorage.getItem("discountApplied") || "0");

  const TotatalPaybleAmount = totalAmount + shippingFee - DiscountAppliedAmount;

  const checkoutID = localStorage.getItem("checkoutID");
  const CurrencyCode = currentChannel?.currencyCode;

  const [checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();
  const [paymentInitialize] = usePaymentInitializeMutation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);

  const handleCreditCardClick = async () => {
    setIsLoading(true);
    if (!checkoutID || !TotatalPaybleAmount) {
      console.log("Checout Id in Select Payment Method", checkoutID);
      console.log(
        "Payment Method in Select Payment Method",
        TotatalPaybleAmount
      );
      console.log("Checkout ID or Payment Method not found");
      setIsLoading(false);
      return;
    }

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
          gatewayFlag: false,
          embeddedFlag: true,
          channel: channel,
        },
      });

      console.log("Payment Initialize", paymentInitializeResponse);
      const errors = paymentInitializeResponse?.data?.paymentInitialize?.errors;
      if (errors && errors.length > 0) {
        console.error("Error in Payment Initialize", errors);
        return;
      } else {
        const SessionId = paymentInitializeResponse?.data?.paymentInitialize
          ?.initializedPayment?.data
          ? JSON.parse(
              paymentInitializeResponse.data.paymentInitialize
                .initializedPayment.data
            ).SessionId
          : null;
        setPaymentSessionId(SessionId);
        console.log("Session ID", SessionId);
        toast.success("Payment Session Initialized!");
        router.push(`?paymentSessionId=${SessionId}`, { scroll: false });
      }
    } catch (error) {
      console.error("Error in Payment Initialize", error);
    } finally {
      setIsLoading(false);
    };
  };

  const paymentOptions =
    CurrentCountry === "Kuwait"
      ? [
          {
            label: "Pay with Debit Card",
            value: "debit-card",
            icon: debitcard,
          },
          {
            label: "Pay with Credit Card",
            value: "credit-card",
            icon: visa,
            icon2: mastercard,
          },
          { label: "Cash on Delivery", value: "cash-on-delivery", icon: cod },
        ]
      : [
          {
            label: "Pay with Credit Card",
            value: "credit-card",
            icon: visa,
            icon2: mastercard,
          },
        ];

  return (
    <div>
      <div className="top-10 z-20">
        <button onClick={onBack}>
          <IoArrowBackOutline className="text-secondary text-xl" />
        </button>
      </div>

      <h1 className="text-lg font-semibold mb-3">Select Payment Method</h1>

      {/* Render Payment Options */}
      <div className="flex flex-row justify-between">
        {paymentOptions.map((option) => (
          <div
            key={option.value}
            className={`w-[32%] border-2 ${
              selectedPaymentMethod === option.value
                ? "border-secondary"
                : "border-disableGray"
            } rounded-lg p-2`}
          >
            <RadioButton
              label={option.label}
              name="options"
              value={option.value}
              checked={selectedPaymentMethod === option.value}
              onChange={() => handleRadioChange(option.value)}
            />
            <div className="flex flex-row my-2 space-x-2 ml-8">
              <Image
                src={option.icon}
                alt={option.value}
                width={40}
                height={32}
              />
              {option.icon2 && (
                <Image
                  src={option.icon2}
                  alt={`${option.value}-secondary`}
                  width={40}
                  height={32}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Mode */}
      <div className="mt-5">
        {selectedPaymentMethod === "credit-card" && (
          <ViaCreditCard
            channel={channel}
            locale={locale}
            paymentSessionId={paymentSessionId as string}
            checkoutID={checkoutID as string}
          />
        )}
        {selectedPaymentMethod === "debit-card" && <ViaDebitCard />}
        {selectedPaymentMethod === "cash-on-delivery" && <ViaCashOnDelivery />}
      </div>
    </div>
  );
};