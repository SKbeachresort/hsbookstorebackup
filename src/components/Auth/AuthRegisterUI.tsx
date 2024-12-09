"use client";
import React, { useState } from "react";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
import Button from "@/app/elements/Button";
import InputField from "@/app/elements/InputField";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Modal from "@/app/elements/Modal";
import Loader from "@/app/elements/Loader";
import { VerifyOTP } from "./VerifyOTP";
import OtpInput from "./OTPInput";

interface AuthRegisterUIProps {
  channel: string;
  locale: string;
};

const AuthRegisterUI: React.FC<AuthRegisterUIProps> = ({
  channel,
  locale
}) => {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpModalOpen(true);
    }, 2000);
  };

  const closeModal = () => {
    setIsOtpModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="w-[90%] mx-auto md:w-[50%] rounded-xl shadow-sm p-4 lg:w-[40%] my-6 xl:w-[28%]">
        <div className="flex flex-col items-center mb-4">
          <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
          <h2 className="text-md font-semibold my-2">Create Account</h2>
        </div>

        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter your Email"
        />

        <InputField
          label="First Name"
          type="text"
          placeholder="Enter First Name"
        />

        <InputField
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
        />

        <InputField
          label="Phone Number"
          type="number"
          placeholder="Enter Phone Number"
        />

        <InputField
          label="Create Password"
          type="password"
          placeholder="Enter your password"
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
        />

        <div className="flex space-x-2 my-3">
          <Checkbox id="terms2" />
          <label
            htmlFor="terms2"
            className="text-sm font-normal text-textColor leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Send me emails about new arrivals, hot items, daily savings and
            more.
          </label>
        </div>

        <Button onClick={openModal}>
          {loading ? <Loader /> : <>Create Account</>}
        </Button>

      </div>

      {/* OTP Modal */}
      <Modal isOpen={isOtpModalOpen} onClose={closeModal}>
        <VerifyOTP closeModal={closeModal} channel={channel} locale={locale}/>
      </Modal>

    </div>
  );
};

export default AuthRegisterUI;