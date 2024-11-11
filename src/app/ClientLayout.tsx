"use client";
import React,{useState, useEffect} from "react";
import { SubCategorySidebar } from "./components/CategoryPage/SubCategorySidebar";
import { usePathname } from "next/navigation";

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
  }, [currentPath]); // Re-run when the path changes

  if (!isClient) {
    return null;
  }

  return (
    <main>
      <div className="flex flex-row">
        {isCategory && <SubCategorySidebar />}
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};