// utils/regionUrl.ts
export const getRegionUrl = (
  channel: string,
  locale: string,
  path: string
): string => {
  return `/${channel}/${locale}/${path}`;
};
