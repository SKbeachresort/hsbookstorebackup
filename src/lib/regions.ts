import { GetStaticPropsContext } from "next";
import { LanguageCodeEnum } from "../../gql/graphql";

export const LOCALES = [
  {
    slug: "en-US",
    code: "EN_US" as LanguageCodeEnum,
    name: "American English",
  },
  { slug: "ar-KW", code: "AR_KW" as LanguageCodeEnum, name: "العربية" },
];

export const START_PARAMS = [
  {
    lng: "ar-KW",
    channel: "default-channel",
  },
  {
    lng: "en-US",
    channel: "channel-usd",
  },
];

export const DEFAULT_LOCALE = "en-US";

export const CHANNEL_SLUG_KEY = "channelSlug";

export interface Channel {
  slug: string;
  name: string;
  currencyCode: string;
  supportedCountriesCodes: string[];
}

export const DEFAULT_CHANNEL: Channel = {
  slug: "default-channel",
  name: "دينار كويتي",
  currencyCode: "KWD",
  supportedCountriesCodes: ["kw", "eg", "sa"],
};

export const CHANNELS: Channel[] = [
  DEFAULT_CHANNEL,
  {
    slug: "channel-usd",
    name: "United States Dollar",
    currencyCode: "USD",
    supportedCountriesCodes: ["us"],
  },
];

export interface RegionCombination {
  channelSlug: string;
  localeSlug: string;
}

export const regionCombinations = () => {
  const combinations: RegionCombination[] = [];
  CHANNELS.forEach((channel) => {
    LOCALES.forEach((locale) => {
      combinations.push({ channelSlug: channel.slug, localeSlug: locale.slug });
    });
  });
  return combinations;
};

export interface Path<T> {
  params: T;
}

export const localeToEnum = (localeSlug: string): LanguageCodeEnum => {
  const chosenLocale = LOCALES.find(({ slug }) => slug === localeSlug)?.code;
  if (chosenLocale) {
    return chosenLocale;
  }
  return (
    LOCALES.find(({ slug }) => slug === DEFAULT_LOCALE)?.code ||
    ("EN_US" as LanguageCodeEnum)
  );
};

export const contextToRegionQuery = (context: GetStaticPropsContext) => ({
  channel: context.params?.channel?.toString() || DEFAULT_CHANNEL.slug,
  locale: localeToEnum(context.params?.locale?.toString() || DEFAULT_LOCALE),
});

export const languageCodeToLocale = (locale: string) => {
  // Converts locale from EN_US to en-US
  const splitted = locale.split("_");
  splitted[0] = splitted[0].toLowerCase();
  return splitted.join("-");
};