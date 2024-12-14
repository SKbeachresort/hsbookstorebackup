"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { SaleorAuthProvider, useAuthChange } from "@saleor/auth-sdk/react";
import apolloClient, {
  saleorApiUrl,
  saleorAuthClient,
} from "@/lib/apolloClient";
import { UserDocument } from "../../gql/graphql";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { CartProvider } from "./CartContext";
import { localeToEnum } from "@/lib/regions";
import RegionsProvider from "./RegionProviders";
import { Sheet } from "@/components/ui/sheet";
import { AuthProvider } from "./AuthContext";
import { useRouter } from "next/navigation";

interface ProviderProps {
  children: React.ReactNode;
  locale: string;
  channel: string;
};

const Provider: React.FC<ProviderProps> = ({ children, locale, channel }) => {
  const router = useRouter();
  useAuthChange({
    saleorApiUrl: saleorApiUrl,
    onSignedOut: async()=>{
      router.push("/");
      await apolloClient.resetStore();
    },
    onSignedIn: () => {
      apolloClient.refetchQueries({ include: "all" });
    },
  });

  return (
    <Sheet>
      <SaleorAuthProvider client={saleorAuthClient}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <CartProvider>
              <RegionsProvider>{children}</RegionsProvider>
            </CartProvider>
          </AuthProvider>
        </ApolloProvider>
      </SaleorAuthProvider>
    </Sheet>
  );
};

export default Provider;