"use client"; 
import React,{useEffect, useState} from "react";
import { useGetLoginUserDetailsQuery } from "../../gql/graphql";
import { getAccessToken } from "@/utils/accessToken";
import { getServerAuthClient } from "@/lib/SaleorAuthServer";

export const getUserDetails = () => {

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);  // Dynamically update the access token
    }
  }, []);
  
  const { data, loading, error } = useGetLoginUserDetailsQuery({
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    skip: !accessToken,
    fetchPolicy: "network-only",
  });

  console.log("Data:", data);

  return {
    user: data?.me || null,
    loading,
    error,
  };
};