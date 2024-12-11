import React from "react";
import { AuthLoginUI } from "@/components/Auth/AuthLoginUI";

interface AuthLoginProps {
  params: {
    channel: string;
    locale: string;
  };
};

const AuthLogin = async({ params }: AuthLoginProps) => {
  const { channel, locale } = await params;

  return (
    <AuthLoginUI channel={channel} locale={locale} />
  );
};

export default AuthLogin;