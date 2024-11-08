"use client"
import React from "react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
 
  const { categoryslug } = useParams();  

  return (
    <div className="h-[40vh]">
      <h1 className="text-[3vh] my-[2vh] font-medium text-center">
        This is Category Page for {categoryslug}
      </h1>
    </div>
  );
};

export default CategoryPage;