import { NextMiddlewareResult } from "next/dist/server/web/types"
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

export type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware

export function middlewareChain(
  functions: MiddlewareFactory[],
  index = 0
): CustomMiddleware {
  const currentMiddleware = functions[index]

  if (currentMiddleware) {
    const next = middlewareChain(functions, index + 1)
    return currentMiddleware(next)
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response
  }
}
