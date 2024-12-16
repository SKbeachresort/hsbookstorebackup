import React, { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { useCompleteCheckoutMutation } from "../../../../gql/graphql"
import { useTranslation } from "@/app/i18n/client"
import { localeToEnum } from "@/lib/regions"
import { setCookie } from "cookies-next"
import { LucideLoader } from "lucide-react"
import toast from "react-hot-toast";
import ProcessingPayment from "./ProcessingPayment"

interface FatoorahResponse {
  sessionId: string
  cardBrand: string
};

export type CheckoutProps = {
  initialSession: string
  countryCode: string
  checkoutId: string
  locale: string
};

declare global {
  interface Window {
    myFatoorah: any;
  }
};

function CheckoutForm({
  initialSession,
  countryCode,
  checkoutId,
  locale,
}: CheckoutProps) {
  const { t } = useTranslation(locale, "checkout")
  const router = useRouter()
  // const [open, setOpen] = useState(false)
  // const [sessionUpdate, setSessionUpdate] = useState<FatoorahResponse>({
  //   sessionId: "",
  //   cardBrand: "",
  // })
  const [isLoaded, setIsLoaded] = useState(false)
  // ? Handling checkout complete...
  const [LoadingPayment, setLoadingPayment] = useState(false)

  const [checkoutComplete, { loading, data, error }] =
        useCompleteCheckoutMutation({
      onCompleted(data, clientOptions) {
        if (
          data &&
          data.checkoutComplete &&
          data.checkoutComplete.errors &&
          data.checkoutComplete.errors.length > 0
        ) {
          return
        }
        if (data && data.checkoutComplete) {
          if (
            data.checkoutComplete.confirmationNeeded &&
            data.checkoutComplete.confirmationData
          ) {
            setCookie(
              "otpUrl",
              JSON.parse(data.checkoutComplete.confirmationData)[
                "iframe"
              ] as string
            )
            router.push(
              `/checkout/${checkoutId}/execute-payment/${initialSession}`
            )
          } else {
            router.push(
              `/checkout/${checkoutId}/confirm-order/${initialSession}`
            )
          }
          // setOpen(true)
        }
        return
      },
    })

  // ? submit the card details to my fatoorah server
  const submitPayment = useCallback(
    function submit() {
      setLoadingPayment(true)
      const myFatoorah = window?.myFatoorah
      if (!myFatoorah) {
        console.warn("Please wait for the page to load.")
        setLoadingPayment(false)
        return
      }
      myFatoorah
        .submit()
        // On success
        .then(async function (response: any) {
          // Here you need to pass session id to you backend here
          var sessionId = response.sessionId
          var cardBrand = response.cardBrand
          // console.log("Success", response, sessionId, cardBrand)
          if (!sessionId) {
            toast.error("No session id returned!")
            return
          }

          await checkoutComplete({
            variables: {
              checkoutId,
              paymentData: JSON.stringify({
                session_id: sessionId,
              }),
            },
          })
        })
        // In case of errors
        .catch(function (error: any) {
          console.error(error)
        })
        .finally(() => {
          setLoadingPayment(false)
        })
    },
    [checkoutComplete, checkoutId, locale]
  )

  const handleBinChanges = (bin: any) => {
    // console.log(bin)
  }

  useEffect(() => {
    if (!isLoaded) return
    const config = {
      countryCode: "KWT", // Since Country code is fixed per account
      sessionId: initialSession,
      cardViewId: "card-element",
      onCardBinChanged: handleBinChanges,
      // The following style is optional.
      style: {
        hideCardIcons: false,
        direction: "ltr",
        cardHeight: 230,
        tokenHeight: 230,
        input: {
          color: "black",
          fontSize: "13px",
          fontFamily: "sans-serif",
          inputHeight: "32px",
          inputMargin: "10px",
          borderColor: "c7c7c7",
          borderWidth: "1px",
          borderRadius: "8px",
          boxShadow: "",
          focus:{
            borderColor: "#2C9CDB",
            borderWidth: "2px",
          },
          placeHolder: {
            holderName: "Name On Card",
            cardNumber: "Number",
            expiryDate: "MM / YY",
            securityCode: "CVV",
          },
        },
        text: {
          saveCard: "Save card info for future payment.",
          addCard: "Use another Card!",
          deleteAlert: {
            title: "Delete",
            message: "Test",
            confirm: "yes",
            cancel: "no",
          },
        },
        label: {
          display: true,
          color: "black",
          fontSize: "13px",
          fontWeight: "normal",
          fontFamily: "sans-serif",
          text: {
            holderName: "Card Holder Name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            securityCode: "Security Code",
          },
        },
        error: {
          borderColor: "red",
          borderRadius: "8px",
          boxShadow: "0px",
        },
      },
    }

    window.myFatoorah && window.myFatoorah.init(config)
    window.myFatoorah &&
      window.addEventListener("message", window.myFatoorah.recievedMessage)

    const isBtnExisting = document.querySelector(".pay-btn")
    if (isBtnExisting) {
      isBtnExisting.remove()
    }

    const cardWrapper = document.getElementById("card-wrapper")
    const submitButton = document.createElement("button")
    submitButton.textContent = "Pay Now"
    submitButton.className = "w-full px-4 text-white py-2 bg-primary text-white font-semibold rounded-lg"
    submitButton.addEventListener("click", () => {
      if (!LoadingPayment) {
        
        submitPayment(); 
      }
    });
    cardWrapper?.appendChild(submitButton);

    return () => {
      submitButton?.removeEventListener("click", () => {
        submitPayment();
      });
    }
  }, [isLoaded, initialSession, submitPayment]);

  return (
    <>
      {/* <Script src="https://code.jquery.com/jquery.js" type="text/javascript" /> */}
      <Script
        id="payment-load"
        src="https://demo.myfatoorah.com/cardview/v2/session.js"
        type="text/javascript"
        onLoad={() => {
          setIsLoaded(true)
        }}
      />

      <section className="relative grid w-full place-items-center">
        {data && data.checkoutComplete && !data.checkoutComplete.errors ? (
          <div className="mx-auto grid max-w-2xl place-items-center rounded-md p-4">
            <ProcessingPayment/>
          </div>
        ) : (
          <div
            id="card-wrapper"
            className="mx-auto grid w-full place-items-center gap-4 rounded-md p-4"
          >
            <h2 className="text-xl font-semibold text-secondary-foreground">
              Payment Card View
            </h2>
            <div id="card-element" className="w-full"></div>
          </div>
        )}
        
      </section>
    </>
  )
}

export default CheckoutForm;