import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import ClientLayout from "./ClientLayout";
import { CartProvider } from "@/context/CartContext";
import createApolloClient from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Provider from "@/context/Provider";

export const metadata: Metadata = {
  title: "HS BookStore",
  description: "A simple bookstore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
      </head>
      <body>
        <Provider>
          <Navbar />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
