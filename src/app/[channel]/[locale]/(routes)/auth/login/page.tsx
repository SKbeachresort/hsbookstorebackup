import React from "react";
import Image from "next/image";
import HSlogo from "../../../../../../../public/HSlogo.png";
import Button from "@/app/elements/Button";
import InputField from "@/app/elements/InputField";
import Link from "next/link";
import { getRegionUrl } from "@/utils/regionUrl";
import { AuthFooter } from "@/components/Auth/AuthFooter";

interface AuthLoginProps {
  params: {
    channel: string;
    locale: string;
  };
};

const AuthLogin = async ({ params }: AuthLoginProps) => {
  const { channel, locale } = await params;

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[90%] mx-auto md:w-[50%] rounded-xl shadow-md p-4 lg:w-[40%] my-6 xl:w-[28%]">
        
        <div className="flex flex-col items-center mb-4">
          <Image src={HSlogo} alt="HS Logo" width={40} height={40} />
          <h2 className="text-md font-semibold my-2">
            Sign in or create your account
          </h2>
          <p className="text-[0.8rem] w-[80%] mx-auto text-center text-textgray">
            Not sure if you have an account? Enter your email and we’ll check
            for you.
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

        <Button>Login</Button>

        <Link href={getRegionUrl(channel, locale, `auth/forgot-password`)}>
          <p className="text-center text-sm font-medium underline text-secondary my-2">
            Forgot your password?
          </p>
        </Link>

        <Link href={getRegionUrl(channel, locale, `auth/register`)}>
          <Button variant="secondary">Create Account</Button>
        </Link>

        <Link href={getRegionUrl(channel, locale, `checkout`)}>
          <Button variant="secondary">Guest Checkout</Button>
        </Link>

        <AuthFooter channel={channel} locale={locale} />
      </div>
    </div>
  );
};

export default AuthLogin;