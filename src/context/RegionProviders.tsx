"use client";
import React, { ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import { LanguageCodeEnum } from "../../gql/graphql";
import {
  Channel,
  CHANNELS,
  DEFAULT_CHANNEL,
  DEFAULT_LOCALE,
  localeToEnum,
} from "@/lib/regions";
import createSafeContext from "@/lib/useSafeContext";
import { useApolloClient } from "@apollo/client";

export interface RegionsConsumerProps {
  channels: Channel[];
  defaultChannel: Channel;
  currentChannel: Channel;
  currentLocale: string;
  query: {
    channel: string;
    locale: LanguageCodeEnum;
  };
  setCurrentChannel: (slug: string) => Promise<void>;
}

export const [useContext, Provider] = createSafeContext<RegionsConsumerProps>();

export interface RegionsProviderProps {
  children: React.ReactNode;
}

export type Params = {
  channel: string;
  locale: string;
};

export function RegionsProvider({ children }: { children: ReactNode }) {
  const params: Params = useParams();

  const apolloClient = useApolloClient();
  // const { resetCheckoutToken } = useCheckout();

  const [currentChannelSlug, setCurrentChannelSlug] = useState(params.channel);

  const setCurrentChannel = async (channel: string) => {
    // resetCheckoutToken();
    setCurrentChannelSlug(channel);
    await apolloClient.resetStore();
  };

  const locale = params.locale || DEFAULT_LOCALE;

  const currentChannel =
    CHANNELS.find(({ slug }) => slug === currentChannelSlug) || DEFAULT_CHANNEL;

  const providerValues: RegionsConsumerProps = {
    channels: CHANNELS,
    defaultChannel: DEFAULT_CHANNEL,
    currentChannel,
    setCurrentChannel,
    currentLocale: locale,
    query: {
      channel: currentChannel.slug,
      locale: localeToEnum(locale),
    },
  };

  return <Provider value={providerValues}>{children}</Provider>;
}

export const useRegions = useContext;

export default RegionsProvider;
