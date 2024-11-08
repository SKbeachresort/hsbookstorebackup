"use client"
import React from "react";
import { useParams } from "next/navigation";

const ProductDetailPage = () => {

  const { productslug } = useParams();

  return (
    <div>
      <h1 className="text-[3vh] font-medium text-center">
        This is Product Detail Page for {productslug}
      </h1>
    </div>
  );
};

export default ProductDetailPage;