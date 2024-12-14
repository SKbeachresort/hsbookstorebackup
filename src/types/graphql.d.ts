import { QueryHookOptions } from "@apollo/client";
import { UserQuery, LanguageCodeEnum } from "./graphql";

type CustomQueryHookOptions = QueryHookOptions<UserQuery, Exact<{ channel?: string | undefined; locale: LanguageCodeEnum; }>> & {
  headers?: {
    Authorization: string;
  };
};

export type UseUserQueryOptions = CustomQueryHookOptions;