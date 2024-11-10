"use client";
import React from "react";
import { useParams } from "next/navigation";
import { SubCategorySidebar } from "@/app/components/CategoryPage/SubCategorySidebar";
import { ProductCard } from "@/app/components/ProductCard/ProductCard";

const CategoryPage = () => {
  const { categoryslug } = useParams();

  const products = [
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book.png",
      currency: "KWD",
      price: 1.99,
      cuttedPrice: 2.5,
      ratings: 4,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book2.png",
      currency: "KWD",
      price: 3.5,
      cuttedPrice: 4.0,
      ratings: 5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book3.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/pen.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/shirt.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/stethoscope.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
  ];

  return (
    <>
      <div className="flex flex-row h-screen">
        <div className="w-[18%] bg-blue-100">
          <SubCategorySidebar />
        </div>
        <div className="w-full px-[5vh]">
          <h1 className="text-[3vh] my-[2vh] font-medium text-center">
            Explore {categoryslug}
          </h1>
          <div className="px-[2vh] gap-x-[1vh] gap-y-[2vh] flex flex-row items-center flex-wrap justify-between overflow-x-scroll">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              image={product.image}
              currency={product.currency}
              currencySymbol="$"
              price={product.price}
              cuttedPrice={product.cuttedPrice}
              ratings={product.ratings}
            />
          ))}
        </div>
        </div>

        
      </div>
    </>
  );
};

export default CategoryPage;
