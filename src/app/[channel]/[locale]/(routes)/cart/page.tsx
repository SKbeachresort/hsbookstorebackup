"use client";
import React, { useState, useEffect } from "react";
import { FiTruck } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/Products";
import { CheckOutWidget } from "@/components/Cart/CheckOutWidget";
import DeliveryAddressCard from "@/components/Cart/DeliveryAddressCard";
import CartItemUI from "@/components/Cart/CartItemUI";
import { PeopleWhoBoughtThis } from "@/components/ProductPage/PeopleWhoBoughtThis";
import { MoreItemsToExplore } from "@/components/ProductPage/MoreItemsToExplore";
import { Recommended } from "@/components/ProductPage/Recommended";
import { RecentlyViewed } from "@/components/ProductPage/RecentlyViewed";

interface CartPageProps {
  params: {
    channel: string;
    locale: string;
  };
}

const CartPage = ({params}:CartPageProps) => {

  const { channel, locale } = params;
  const { cartItems, incrementQuantity, decrementQuantity,removeFromCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        </div>
      ) : (
        <div className="">
          <h1 className="text-xl font-semibold ">
            Cart ({cartItems.length} items){" "}
          </h1>

          <div className="relative h-auto flex-col flex md:flex-row justify-between ">
            <div className="md:w-[55%] lg:w-[67%] py-5">
              {/* Delivery Address */}
              <DeliveryAddressCard />

              {/* Cart Items */}
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

              {/* People who bought */}
              <PeopleWhoBoughtThis />

              {/* Recommended */}
              <Recommended />

            </div>
            <div className="md:w-[40%] lg:w-[30%] h-auto">
              <div className="sticky top-10 py-5 z-40">
                <CheckOutWidget 
                  totalAmount={totalAmount} 
                  cartItems={cartItems} 
                  channel={channel}
                  locale={locale}
                />
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;