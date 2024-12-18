"use client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";

interface SaveForLaterProps {
  item: {
    id: string;
    mainImage: string;
    name: string;
    currency?: string;
    price?: number;
  };
  removeFromSaveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
};

const SaveForLaterUI: React.FC<SaveForLaterProps> = ({
  item,
  removeFromSaveForLater,
  moveToCart,
}) => {
  return (
    <div className="flex items-start md:items-center rounded-2xl justify-between my-10">
      <div>
        <Image
          src={item.mainImage}
          alt={item.name}
          width={80}
          height={80}
          className="w-20 h-28 lg:w-28 lg:h-36"
        />
      </div>

      <div className="w-[60%] md:w-[70%] xl:w-[82%] flex flex-col gap-2 lg:flex-row lg:justify-between">
        <div className="lg:w-[70%]">
          <h4 className="font-medium">{item.name}</h4>
          <button
            onClick={() => removeFromSaveForLater(item.id)}
            className="text-xs text-textgray underline mt-1"
          >
            Remove item
          </button>
          <button
            onClick={() => moveToCart(item.id)}
            className="text-xs text-textgray underline mt-1 ml-4"
          >
            Move to cart
          </button>
        </div>

        <div className="lg:w-[20%]">
          <p className="text-lg font-semibold my-2">
             {item.currency} {(Number(item.price) || 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveForLaterUI;
