import React from "react";
import { useRegions } from "@/context/RegionProviders";

export const useRegionUrl = () => {

  const { currentLocale, currentChannel } = useRegions();

  const getRegionUrl = (path: string): string => {
    return `/${currentChannel.slug}/${currentLocale}/${path}`;
  };

  return { getRegionUrl };
};
