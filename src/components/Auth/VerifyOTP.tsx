"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
import verify from "../../../public/verify.png";
import OtpInput from "./OTPInput";
import { getRegionUrl } from "@/utils/regionUrl";
import toast from "react-hot-toast";
import { Checkbox } from "../ui/checkbox";
import Button from "@/app/elements/Button";

interface VerifyOTPProps {
  channel: string;
  locale: string;
  closeModal: () => void;
}

export const VerifyOTP: React.FC<VerifyOTPProps> = ({
  closeModal,
  channel,
  locale,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResending, setIsResending] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleOtpChange = (newOtp: string[], index: number) => {
    setOtp(newOtp);
  };

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isResending && resendTimer > 0) {
      interval = window.setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResending(false);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isResending, resendTimer]);

  const handleResend = () => {
    setIsResending(true);
    setResendTimer(30);
  };

  return (
    <div className="p-2">
      <button
        onClick={closeModal}
        className="float-end text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <div className="flex flex-col items-center mb-4">
        <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
        <h2 className="text-md font-semibold my-2">Enter 6 digit Code</h2>
      </div>
      <div className="flex flex-col items-center mb-4">
        <Image src={verify} alt="verify" width={40} height={40} />
        <h2 className="text-sm font-normal my-2">
          Please enter 6-digit code we sent to you phone number
        </h2>
        <p className="text-md text-center font-semibold">+91 9689675896</p>
      </div>

      <Link href={getRegionUrl(channel, locale, `auth/forgot-password`)}>
        <p className="text-center text-sm font-medium underline text-secondary my-2">
          Forgot your password?
        </p>
      </Link>

      <div className="my-6">
        <OtpInput otp={otp} onChange={handleOtpChange} />

        <div className="my-3">
          {isResending && (
            <h1 className="text-center text-md text-textgray font-medium my-3">
              Resend in{"  "}
              <span className="text-md font-bold  text-primary">
                {resendTimer} sec
              </span>
            </h1>
          )}

          {!isResending && (
            <h1 className="text-center text-textColor font-normal text-sm">
              You didn’t receive the code?{" "}
              <span
                onClick={handleResend}
                className="text-sm font-bold underline cursor-pointer text-secondary"
              >
                {loading ? "Resending" : "Get another code"}
              </span>
            </h1>
          )}
        </div>
        <div className="flex justify-center space-x-2 my-4">
          <Checkbox id="terms2" />
          <label
            htmlFor="terms2"
            className="text-sm font-normal text-textColor leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Keep me signed in
          </label>
        </div>

        <div className="mt-6">
          <Button>Verify and Create Account</Button>
        </div>
      </div>
    </div>
  );
};
