"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckOutWidget } from "@/components/Cart/CheckOutWidget";
import DeliveryAddressCard from "@/components/Cart/DeliveryAddressCard";
import CartItemUI from "@/components/Cart/CartItemUI";

export const ReviewOrder = () => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">
        Checkout ({cartItems.length} items){" "}
      </h1>

      {/* Delivery Address */}
      <div className="my-2 border-[1px] border-disableGray p-5 rounded-md">
        <div className="mb-4">
          <h1 className="mb-3 text-lg font-semibold">Shipping Address</h1>
          <div className="text-textgray mb-2">
            <p className="text-sm">Kuwait, Kuwait City, Faiha</p>
            <p className="text-sm">Mohhammad Al Adwani</p>
            <p className="text-sm">
              Street Address Details, Block, Avenue, Street, Floor Apartment
            </p>
          </div>
          <p className="underline text-secondary text-sm">change address</p>
        </div>
        <div>
          <h1 className="mb-3 text-lg font-semibold">Billing Address</h1>
          <div className="text-textgray mb-2">
            <p className="text-sm">Kuwait, Kuwait City, Faiha</p>
            <p className="text-sm">Mohhammad Al Adwani</p>
            <p className="text-sm">
              Street Address Details, Block, Avenue, Street, Floor Apartment
            </p>
          </div>
          <p className="underline text-secondary text-sm">change address</p>
        </div>
      </div>

      <div className="rounded-2xl p-8 border-[1px] border-borderColor">
        {cartItems.map((item, index) => (
          <CartItemUI
            key={index}
            item={item}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};
