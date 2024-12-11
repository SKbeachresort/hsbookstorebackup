// createHttpLink,
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { relayStylePagination } from "@apollo/client/utilities"
import { createSaleorAuthClient } from "@saleor/auth-sdk"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

export const saleorApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL!

// Saleor Auth Client
export const saleorAuthClient = createSaleorAuthClient({
  saleorApiUrl,
  defaultRequestInit: {
    credentials: "include",
  },
  accessTokenStorage: {
    getItem(_key) {
      return localStorage?.getItem("access_token")
    },
    setItem(_key, value) {
      return localStorage?.setItem("access_token", value)
    },
    removeItem(_key) {
      return localStorage?.removeItem("access_token")
    },
  },
});

const httpLink = createUploadLink({
  uri: saleorApiUrl,
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    saleorAuthClient.fetchWithAuth(input, init, {
      allowPassingTokenToThirdPartyDomains: true,
    }),
});


const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          category: relayStylePagination(),
        },
      },
    },
  }),
})

export default apolloClient;