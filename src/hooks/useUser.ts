"use client";
import { useBasicUserQuery } from "../../gql/graphql";
import { useRegions } from "@/context/RegionProviders";
import { localeToEnum } from "@/lib/regions";

export const useUser = () => {
  const { currentChannel, currentLocale } = useRegions();

  const { data, loading } = useBasicUserQuery({
    fetchPolicy: "network-only",
  });

  const user = data?.user;

  const authenticated = !!user?.id;

  return { user, loading: loading, authenticated };
};