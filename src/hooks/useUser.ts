"use client";
import { useEffect, useState } from "react";
import { useUserQuery } from "../../gql/graphql";
import { useRegions } from "@/context/RegionProviders";
import { localeToEnum } from "@/lib/regions";
import { getCookie } from "cookies-next";
import { UseUserQueryOptions } from "@/types/graphql";

export const useUser = () => {
  const { currentChannel, currentLocale } = useRegions();
  const [token, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);
  console.log("Token:", token);

  const { data, loading } = useUserQuery({
    variables: {
      locale: localeToEnum(currentLocale),
      channel: currentChannel.slug,
    },
    skip: !token,
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const user = data?.user;
  console.log("User Hook", data);

  const authenticated = !!user?.id;

  return { user, loading: loading, authenticated };
};