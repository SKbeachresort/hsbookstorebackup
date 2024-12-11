import React from "react";
import { AuthLoginUI } from "@/components/Auth/AuthLoginUI";

interface AuthLoginProps {
  params: {
    channel: string;
    locale: string;
  };
}

const AuthLogin = async ({ params }: AuthLoginProps) => {
  const { channel, locale } = await params;

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[90%] mx-auto md:w-[50%] rounded-xl shadow-md p-4 lg:w-[40%] my-6 xl:w-[28%]">
        <AuthLoginUI channel={channel} locale={locale} />
      </div>
    </div>
  );
};

export default AuthLogin;
