"use client";
import { useUserQuery } from "../../gql/graphql";
import { useRegions } from "@/context/RegionProviders";
import { localeToEnum } from "@/lib/regions";

export const useUser = () => {
  const { currentChannel, currentLocale } = useRegions();

  const { data, loading } = useUserQuery({
    variables: {
      locale: localeToEnum(currentLocale),
      channel: currentChannel.slug,
    },
    fetchPolicy: "network-only",
  });

  const user = data?.user;

  const authenticated = !!user?.id;

  return { user, loading: loading, authenticated };
};