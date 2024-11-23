import { DEFAULT_LOCALE, LOCALES } from "@/lib/regions"

// export const fallbackLng = "ar"

export const languages: string[] = [...LOCALES.map((loc) => loc.slug)]

export const defaultNS = "home"

export function getOptions(
  lng = DEFAULT_LOCALE,
  ns: string | string[] = defaultNS
) {
  return {
    supportedLngs: languages,
    fallbackLng: DEFAULT_LOCALE,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
