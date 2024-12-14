"use server"

import { getServerAuthClient } from "@/lib/SaleorAuthServer"

export async function userLogout() {
  return getServerAuthClient().signOut()
}