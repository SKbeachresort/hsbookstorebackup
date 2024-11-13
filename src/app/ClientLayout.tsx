"use client";
import React, { useState, useEffect } from "react";
import { SubCategorySidebar } from "./components/CategoryPage/SubCategorySidebar";
import { usePathname } from "next/navigation";
import { CartProvider } from "./context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const currentPath = usePathname();

  useEffect(() => {
    setIsClient(true);
    setIsCategory(currentPath.startsWith("/category"));
  }, [currentPath]);

  if (!isClient) {
    return null;
  }

  return (
    <main className="mx-auto min-h-[calc(100dvh-133px)] max-w-[1920px] px-4 sm:px-10 lg:px-12">
      <div className="flex flex-row">
        {isCategory && <SubCategorySidebar />}
          <div className="w-full">{children}</div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#111",
              borderRadius: "none",
              padding: "1.9vh",
              fontSize: "2vh",
            },
            success: {
              style: {
                background: "#fff",
                color: "#111",
                borderRadius: "none",
                padding: "1.9vh",
                fontSize: "2vh",
              },
            },
            error: {
              style: {
                background: "#fff",
                color: "#111",
                borderRadius: "none",
                padding: "1.9vh",
                fontSize: "2vh",
              },
            },
          }}
        />
      </div>
    </main>
  );
}
