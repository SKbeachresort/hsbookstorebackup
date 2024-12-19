"use client";
import { useAddressUserQuery } from "../../gql/graphql";
import { useRegions } from "@/context/RegionProviders";

export const useAddressUser = () => {
  
  const { currentChannel, currentLocale } = useRegions();

  const { data, loading, refetch } = useAddressUserQuery({
    fetchPolicy: "network-only",
  });

  const userAddress = data?.user?.defaultShippingAddress;
  const userAddresses = data?.user?.addresses
  const userDefaultShippingAddress = data?.user?.defaultShippingAddress;
  const userDefaultBillingAddress = data?.user?.defaultBillingAddress;

  const authenticated = !!userAddress?.id;

  return {
    userAddress,
    userAddresses,
    userAddressLoading: loading,
    authenticated,
    userDefaultBillingAddress,
    userDefaultShippingAddress,
    refetchUserAddresses: refetch,
  };
};