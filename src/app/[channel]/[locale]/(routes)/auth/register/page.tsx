import React from "react";
import AuthRegisterUI from "@/components/Auth/AuthRegisterUI";

interface AuthLoginProps {
  params: {
    channel: string;
    locale: string;
  };
}

const AuthRegister = ({ params }: AuthLoginProps) => {
  const { channel, locale } = params;

  return (
    <div>
      <AuthRegisterUI channel={channel} locale={locale} />
    </div>
  );
};

export default AuthRegister;