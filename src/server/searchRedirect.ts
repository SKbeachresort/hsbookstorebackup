"use server"

import { redirect } from "next/navigation"

type TRedirectToSearch = {
  channel: string
  locale: string
  searchValue: string
};

export async function redirectToSearch({
  channel,
  locale,
  searchValue,
}: TRedirectToSearch) {
  redirect(
    `/${encodeURIComponent(
      channel
    )}/${locale}/search?query=${encodeURIComponent(searchValue.trim())}`
  )
};