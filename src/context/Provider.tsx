"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import apolloClient, {
  saleorApiUrl,
  saleorAuthClient,
} from "@/lib/apolloClient";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartProvider } from "./CartContext";
import { localeToEnum } from "@/lib/regions";
import RegionsProvider from "./RegionProviders";

interface ProviderProps {
  children: React.ReactNode;
  locale:string;
  channel:string;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  useAuthChange({
    saleorApiUrl,
    onSignedOut: () => apolloClient.resetStore(),
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "all" });
    },
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>
        <CartProvider>
          <RegionsProvider>
            {children}
          </RegionsProvider>
        </CartProvider>
      </ApolloProvider>
    </SaleorAuthProvider>
  );
};

export default Provider;