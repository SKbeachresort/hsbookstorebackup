"use client";
import React, { useState, useEffect } from "react";
import { SubCategorySidebar } from "@/components/CategoryPage/SubCategorySidebar";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import 'aos/dist/aos.css'
import AOS from 'aos';

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
    setIsCategory(currentPath.includes("/category"));
    AOS.init({
      duration: 1000,
      once: false,      
      easing: 'ease-in-out', 
    });
    AOS.refresh();
    return () => {
      AOS.refreshHard();
    };
  }, [currentPath]);

  if (!isClient) {
    return null;
  };
  
  return (
    <main className="mx-auto min-h-[calc(100dvh-133px)] max-w-[1920px]">
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
              padding: "20px",
              fontSize: "16px",
            },
            success: {
              style: {
                background: "#fff",
                color: "#111",
                borderRadius: "none",
                padding: "20px",
                fontSize: "16px",
              },
            },
            error: {
              style: {
                background: "#fff",
                color: "#111",
                borderRadius: "none",
                padding: "20px",
                fontSize: "16px",
              },
            },
          }}
        />
      </div>
    </main>
  );
}
