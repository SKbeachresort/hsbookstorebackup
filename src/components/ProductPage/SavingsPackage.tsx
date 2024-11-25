"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useCart } from "@/context/CartContext";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import toast from "react-hot-toast";

import book from "../../../public/products/book.png";
import book2 from "../../../public/products/book2.png";
import book3 from "../../../public/products/book3.png";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  mainImage: StaticImageData;
  selected: boolean;
}

const productsData: Product[] = [
  {
    id: "1",
    name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
    price: 18.0,
    currency: "KWD",
    mainImage: book,
    selected: true,
  },
  {
    id: "2",
    name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
    price: 18.0,
    currency: "KWD",
    mainImage: book2,
    selected: true,
  },
  {
    id: "3",
    name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
    price: 18.0,
    currency: "KWD",
    mainImage: book3,
    selected: true,
  },
];

const SavingsPackage: React.FC = () => {
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState(productsData);

  const total = products
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + product.price, 0);

  // const handleAddToCart = () => {
  //   products
  //     .filter((product) => product.selected)
  //     .forEach((product) => addToCart({ ...product, quantity: 1 }));
  //     toast.success("Product added to cart");
  // };

  const toggleSelection = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  return (
    <div className="my-5">
      <h2 className="text-xl font-semibold my-4">Savings Package</h2>

      <div className="flex flex-col xl:flex-row items-center md:items-start xl:items-center  xl:gap-10">
        <div className="flex flex-row gap-2 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => toggleSelection(product.id)}
              className="flex flex-col md:flex-row justify-between md:justify-start items-start gap-2 md:gap-3 rounded-md p-2 md:p-4 w-24 md:w-44 cursor-pointer"
            >
              <button
                className="mb-2 text-md md:text-xl"
              >
                {product.selected ? <FaCheckSquare className="text-secondary"/> : <FaRegSquare className="text-secondary"/>}
              </button>
              <div>
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  width={100}
                  height={150}
                  className="w-[100%] md:w-full mb-2"
                />
                <p className="text-justify text-[0.6rem] md:text-xs font-normal">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-md text-center">
          <p className="text-2xl font-semibold my-1">Total: ${total.toFixed(2)}</p>
          <p className="text-success text-sm">You Save: $12.36 (12%)</p>
          <button
            // onClick={handleAddToCart}
            className="bg-secondary text-white rounded-full font-medium text-md px-6 py-2 mt-2"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsPackage;
