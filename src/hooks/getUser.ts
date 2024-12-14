"use client"; 
import React,{useEffect, useState} from "react";
import { useUserQuery } from "../../gql/graphql";
import { getAccessToken } from "@/utils/accessToken";
import { useRegions } from "@/context/RegionProviders";
import { localeToEnum } from "@/lib/regions";

export const getUserDetails = () => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { currentChannel, currentLocale } = useRegions();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);  
    }
  }, []);
  
  const { data, loading, error } = useUserQuery({
    variables:{
      locale: localeToEnum(currentLocale),
      channel: currentChannel.slug,
    },
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
    user: data?.user || null,
    loading,
    error,
  };
};