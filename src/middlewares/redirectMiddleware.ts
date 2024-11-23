import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

import { CustomMiddleware } from "./middlewareChain"

/**
 *
 * @param middleware
 * @returns middleware
 * @description Middleware to handle the stage after user login redirection...
 *
 */

export const withRedirectMiddleware = (middleware: CustomMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    // handle logic when user go to login page and then redirect to the last page was using.
    const response = NextResponse.next()
    const { pathname } = req.nextUrl

    if (pathname.includes("signin") || pathname.includes("signup")) {
      const referrer = req.headers.get("referer")
      if (!referrer) return middleware(req, event, response)

      const referrerUrl = new URL(referrer)
      const referrerPathname = referrerUrl.pathname
      if (
        referrerPathname.includes("signup") ||
        referrerPathname.includes("signin")
      )
        return middleware(req, event, response)
      response.cookies.set("redirectTo", referrerPathname)
    }

    return middleware(req, event, response)
  }
}
