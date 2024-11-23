import { withLocaleChannelMiddleware } from "./middlewares/localeChannelMiddleware"
import { middlewareChain } from "./middlewares/middlewareChain"
import { withRedirectMiddleware } from "./middlewares/redirectMiddleware"

export default middlewareChain([
  withRedirectMiddleware,
  withLocaleChannelMiddleware,
])

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|html|assets|favicon.ico|sw.ts).*)",
  ],
};