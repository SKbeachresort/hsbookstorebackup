// next.d.ts
import { NextRequest } from "next/server"

declare module "next/server" {
  interface NextRequest {
    geo?: {
      country?: string
    }
  }
}
