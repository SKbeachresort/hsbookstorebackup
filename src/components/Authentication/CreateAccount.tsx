"use client";
import React from "react";
import InputField from "@/app/elements/InputField";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
import CustomButton from "@/app/elements/Button";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";
import { AuthFooter } from "../Auth/AuthFooter";

interface CreateAccountProps {
  channel: string;
  locale: string;
  closeModal: () => void;
};

const CreateAccount: React.FC<CreateAccountProps> = ({ closeModal, channel, locale }) => {

  const { getRegionUrl } = useRegionUrl();

  return (
    <div className="p-6 bg-white rounded-lg  relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <div className="flex flex-col items-center mb-4">
        <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
        <h2 className="text-md font-semibold my-2">
          Sign in or create your account
        </h2>
        <p className="text-[0.8rem] w-[80%] mx-auto text-center text-textgray">
          Not sure if you have an account? Enter your email and we’ll check for
          you.
        </p>
      </div>

      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <CustomButton onClick={() => {}}>Login</CustomButton>
      <div className="text-center my-2 text-textgray text-xs">OR</div>

      <CustomButton variant="secondary" onClick={() => {}}>
        Create an Account
      </CustomButton>

      <Link href={getRegionUrl("/checkout")}>
        <CustomButton variant="secondary" onClick={() => {}}>
          Guest Checkout
        </CustomButton>
      </Link>

      <AuthFooter channel={channel} locale={locale} />

    </div>
  );
};

export default CreateAccount;