"use client";
import React, { useEffect, useState } from "react";
import { useAccountConfirmMutation } from "../../../../../../../gql/graphql";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

const AccountConfirm = () => {
  const [accountConfirm, { loading, data, error }] = useAccountConfirmMutation();
  const [status, setStatus] = useState<string>("");
  const [timer, setTimer] = useState<number>(5);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email && token) {
      const decodedEmail = (email as string).replace("%40", "@");
      console.log("Decoded Email", decodedEmail);
      console.log("Token", token);

      accountConfirm({
        variables: {
          email: decodedEmail,
          token: token as string,
        },
      })
        .then(({ data }) => {
          console.log("Account Confirmed Response", data);
          if (data?.confirmAccount?.user?.isConfirmed) {
            setStatus("Your Email Address Verified");
            let countdown = 5;
            const interval = setInterval(() => {
              countdown -= 1;
              setTimer(countdown);
              if (countdown <= 0) {
                clearInterval(interval);
                router.push(`/auth/login`);
              }
            }, 1000);
          } else {
            setStatus("Invalid Token");
            setTimeout(() => {
              router.push("/auth/register");
            }, 3000);
          }
        })
        .catch((error) => {
          toast.error("Invalid Token");
          console.error("Account Confirm Error", error);
          setStatus("Invalid Token");
          setTimeout(() => {
            router.push("/auth/register"); 
          }, 3000);
        });
    }
  }, [searchParams, accountConfirm]);

  return (
    <div className="h-screen flex flex-col items-center">
      <div
        className={`flex flex-col items-center justify-center my-20 px-10 py-4 ${
          status === "Your Email Address Verified"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        <h1 className="text-white text-xl font-bold">{status}</h1>
        {status === "Your Email Address Verified" && (
          <p className="text-white mt-4">
            Redirecting to login in {timer} seconds...
          </p>
        )}
        {status === "Invalid Token" && (
          <p className="text-white mt-4">
            Please check your token and try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountConfirm;