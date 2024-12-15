"use client";
import InputField from "@/app/elements/InputField";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useCheckoutPaymentCreateMutation } from "../../../../gql/graphql";
import { usePaymentInitializeMutation } from "../../../../gql/graphql";
import { useCart } from "@/context/CartContext";
import { useRegions } from "@/context/RegionProviders";
import { useRouter } from "next/navigation";
import { getRegionUrl } from "@/utils/regionUrl";
import Loader from "@/app/elements/Loader";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "../PaymentEmbedded/CreditCardCheckout";

type FormValues = {
  cardNumber: string;
  nameOnCard: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  defaultPayment: boolean;
};

interface ViaCreditCardProps {
  locale: string;
  channel: string;
}

export const ViaCreditCard: React.FC<ViaCreditCardProps> = ({
  channel,
  locale,
}) => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);

  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();
  const [isloading, setIsLoading] = useState(false);
  const { currentChannel } = useRegions();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  const shippingMethodsRaw = localStorage.getItem("shippingMethodId");
  let shippingMethods = [];

  try {
    const parsedData = JSON.parse(shippingMethodsRaw || "[]");
    shippingMethods = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Error parsing shipping methods:", error);
  }

  const shippingPrice =
    shippingMethods.length > 0 ? shippingMethods[0].price.amount : null;

  const TotatalPaybleAmount = totalAmount + (shippingPrice ?? 0);
  const checkoutID = localStorage.getItem("checkoutID");
  console.log("checkoutID in Credit Card", checkoutID);
  console.log("payableAmount in Credit Card", TotatalPaybleAmount);

  const CurrencyCode = currentChannel?.currencyCode;
  const [checkoutPaymentCreate] = useCheckoutPaymentCreateMutation();
  const [paymentInitialize] = usePaymentInitializeMutation();

  const handleContinueClick = async () => {
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
        console.log("Session ID", SessionId);
        toast.success("Payment Session Initialized!");
        router.push(`?paymentSessionId=${SessionId}`, { scroll: false });
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error in Payment Initialize", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const form = useForm<FormValues>({
  //   defaultValues: {
  //     cardNumber: "",
  //     nameOnCard: "",
  //     expiryMonth: "",
  //     expiryYear: "",
  //     cvv: "",
  //     defaultPayment: false,
  //   },
  // });

  // const onSubmit: SubmitHandler<FormValues> = (data) => {
  //   console.log("Form Submitted:", data);
  // };

  const paymentSessionId = SearchParams.get("paymentSessionId");

  return (
    <div className="md:w-[70%] lg:w-[60%] xl:w-[50%]">
      {!showForm ? (
        <div className="flex justify-center">
          <button
            onClick={handleContinueClick}
            className="px-4 py-2 w-full bg-secondary text-white font-semibold rounded"
          >
            {isloading ? <Loader /> : `Click here to initiate session`}
          </button>
        </div>
      ) : (
        <div>
          {paymentSessionId && (
            <CheckoutForm
              locale={locale}
              initialSession={paymentSessionId}
              countryCode={"KWT"}
              checkoutId={checkoutID as string}
            />
          )}
        </div>
      )}
    </div>
  );
};
