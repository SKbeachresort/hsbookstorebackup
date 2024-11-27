import type { Metadata } from "next";

import "../../../globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import ClientLayout from "./ClientLayout";
import { CartProvider } from "@/context/CartContext";
import createApolloClient from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Provider from "@/context/Provider";
import { START_PARAMS } from "@/lib/regions";
import { dir } from "i18next"

export const metadata: Metadata = {
  title: "HS BookStore",
  description: "A simple bookstore",
};

export type PagesProps = {
  params: { channel: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type LayoutProps = PagesProps & { children: React.ReactNode };

export async function generateStaticParams() {
  return START_PARAMS.map((param) => ({
    locale: param.lng,
    channel: param.channel,
  }))
}

export default function RootLayout({
  children,
  params: { locale, channel },
}: LayoutProps) {

  const lng = locale.split("-")[0]

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
      </head>
      <body>
        <Provider locale={locale} channel={channel}>
          <Navbar />
            <ClientLayout>{children}</ClientLayout>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};