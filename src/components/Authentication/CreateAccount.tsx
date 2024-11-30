"use client";
import React from "react";
import InputField from "@/app/elements/InputField";
import Image from "next/image";
import HSlogo from "../../../public/HSlogo.png";
import Button from "@/app/elements/Button";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

interface CreateAccountProps {
  closeModal: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ closeModal }) => {

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

      <Button onClick={() => {}}>Login</Button>
      <div className="text-center my-2 text-textgray text-xs">OR</div>

      <Button variant="secondary" onClick={() => {}}>
        Create an Account
      </Button>

      <Link href={getRegionUrl("/checkout")}>
        <Button variant="secondary" onClick={() => {}}>
          Guest Checkout
        </Button>
      </Link>

      <div className="text-xs text-gray-500 mt-4 text-center">
        By Login or Signup to HSBookstore you agree with our{" "}
        <p>
          <a href="#" className="text-secondary underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-secondary underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
