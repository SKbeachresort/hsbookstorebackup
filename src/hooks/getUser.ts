import { useGetLoginUserDetailsQuery } from "../../gql/graphql";
import { getAccessToken } from "@/utils/accessToken";

export const getUserDetails = () => {

  const accessToken = getAccessToken();

  const { data, loading, error } = useGetLoginUserDetailsQuery({
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};