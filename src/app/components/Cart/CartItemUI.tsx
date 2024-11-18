// CartItem.tsx
"use client";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: number;
    mainImage: string;
    name: string;
    currency: string;
    price: number;
    quantity: number;
  };
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const CartItemUI: React.FC<CartItemProps> = ({
  item,
  incrementQuantity,
  decrementQuantity,
    removeFromCart,
}) => {
  return (
    <div className="flex items-center rounded-2xl justify-between my-10">
      <div className="flex items-center gap-4">
        <Image
          src={item.mainImage}
          alt={item.name}
          width={80}
          height={80}
          //   className="w-16 h-16 object-cover"
        />
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-xs text-textgray underline mt-1">
            Remove item
          </button>
          <button className="text-xs text-textgray underline mt-1 ml-4">
            Save for later
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold my-2">
          {item.currency} {item.price.toFixed(3)}
        </p>
        <div className="flex px-2 gap-x-4 py-1 items-center border-[1px] border-borderColor rounded-full justify-between ">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="rounded"
          >
            <AiOutlineMinus className="text-sm" />
          </button>
          <span className="text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => incrementQuantity(item.id)}
            className=" rounded"
          >
            <AiOutlinePlus className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemUI;