import { TypedDocumentString } from "../../gql/graphql-documents"
import { invariant } from "ts-invariant"

import { getServerAuthClient } from "./SaleorAuthServer"

invariant(
  process.env.NEXT_PUBLIC_BACKEND_URL,
  "Missing NEXT_PUBLIC_BACKEND_URL env variable"
)

type GraphQLErrorResponse = {
  errors: readonly {
    message: string
  }[]
}

type GraphQLResponse<T> = { data: T } | GraphQLErrorResponse

export const ProductsPerPage = 12
const saleorApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL!

export async function executeGraphQL<Result, Variables>(
  operation: TypedDocumentString<Result, Variables>,
  options: {
    headers?: HeadersInit
    cache?: RequestCache
    revalidate?: number
    withAuth?: boolean
    retryCount?: number // Add retry count
    retryDelay?: number // Add retry delay in ms
  } & (Variables extends Record<string, never>
    ? { variables?: never }
    : { variables: Variables })
): Promise<Result> {
  invariant(saleorApiUrl, "Missing NEXT_PUBLIC_BACKEND_URL env variable")
  const {
    variables,
    headers,
    cache,
    revalidate,
    withAuth = false,
    retryCount = 3,
    retryDelay = 1000,
  } = options

  const input = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query: operation.toString(),
      ...(variables && { variables }),
    }),
    cache: cache,
    next: { revalidate },
  }

  let attempt = 0

  while (attempt <= retryCount) {
    try {
      const response = withAuth
        ? await getServerAuthClient().fetchWithAuth(saleorApiUrl, input, {
            allowPassingTokenToThirdPartyDomains: true,
          })
        : await fetch(saleorApiUrl, input)

      if (!response.ok) {
        const body = await (async () => {
          try {
            return await response.text()
          } catch {
            return "Something went wrong, Please try again later"
          }
        })()
        throw new HTTPError(response, body)
      }

      const body = (await response.json()) as GraphQLResponse<Result>

      if ("errors" in body) {
        throw new GraphQLError(body)
      }

      return body.data
    } catch (error) {
      attempt += 1
      if (attempt > retryCount) {
        throw error // Exhausted all retries, rethrow the error
      }
      await delay(retryDelay) // Wait before retrying
    }
  }

  // Adding this explicit throw ensures that TypeScript knows the function always returns or throws
  throw new Error("Failed to execute GraphQL operation after all retries")
}

// Utility function to introduce a delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class GraphQLError extends Error {
  constructor(public errorResponse: GraphQLErrorResponse) {
    const message = errorResponse.errors
      .map((error) => error.message)
      .join("\n")
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class HTTPError extends Error {
  constructor(response: Response, body: string) {
    const message = `HTTP error ${response.status}: ${response.statusText}\n${body}`
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
