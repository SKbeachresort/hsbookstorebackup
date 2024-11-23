import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { languages } from "@/app/i18n/settings"
import acceptLanguage from "accept-language"

import { CHANNELS, DEFAULT_CHANNEL, DEFAULT_LOCALE } from "../lib/regions"
import { CustomMiddleware } from "./middlewareChain"

const cookieName = "i18next"
const channelCookieName = "channelData"

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|html|assets|favicon.ico|sw.ts).*)",
//   ],
// }

/**
 *
 * @param middleware
 * @returns middleware
 * @description Middleware to handle locale and channel
 *
 */

export function withLocaleChannelMiddleware(middleware: CustomMiddleware) {
  return async (
    req: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    // const response = NextResponse.next()

    let lng, channel
    // will return language match
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)

    // check channel
    if (req.cookies.has(channelCookieName))
      channel = req.cookies.get(channelCookieName)?.value

    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"))

    if (!lng) lng = DEFAULT_LOCALE

    if (!channel) {
      const requestCountry = req.geo?.country?.toLowerCase()
      if (requestCountry)
        channel = CHANNELS.find((ch) =>
          ch.supportedCountriesCodes.includes(requestCountry)
        )?.slug
    }

    if (!channel) {
      channel = DEFAULT_CHANNEL.slug
    }

    // Redirect if lng in path is not supported
    if (
      !languages.some(
        (loc) =>
          req.nextUrl.pathname.includes(`/${loc}`) &&
          !req.nextUrl.pathname.startsWith("/_next")
      )
    ) {
      const queryString = req.nextUrl.searchParams

      return NextResponse.redirect(
        new URL(
          `/${channel}/${lng}${req.nextUrl.pathname}?${queryString.toString()}`,
          req.url
        )
      )
    }

    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(`/${channel}/${lng}`, req.url))
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer")!)
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.includes(`/${l}`)
      )

      // const response = NextResponse.next()
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
      return response
    }
    // create channel cookie if not exist!
    if (!req.cookies.has(channelCookieName)) {
      // const response = NextResponse.next()
      response.cookies.set(channelCookieName, channel)
    }

    return middleware(req, event, response)
  }
};