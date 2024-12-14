"use server";

import { getServerAuthClient } from "@/lib/SaleorAuthServer";

export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await getServerAuthClient().signIn(
    { email, password },
    { cache: "no-store", credentials: "include" }
  );

  return result;
}