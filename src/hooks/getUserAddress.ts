"use client";
import { useAddressUserQuery } from "../../gql/graphql";
import { useRegions } from "@/context/RegionProviders";

export const useAddressUser = () => {
  const { currentChannel, currentLocale } = useRegions();

  const { data, loading } = useAddressUserQuery({
    fetchPolicy: "network-only",
  });

  const userAddress = data?.user?.defaultShippingAddress;

  const authenticated = !!userAddress?.id;

  return { userAddress, userAddressLoading: loading, authenticated };
};