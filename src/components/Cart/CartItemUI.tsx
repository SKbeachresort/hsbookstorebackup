"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import {
  useAddProductSaveForLaterMutation,
  useViewSaveLaterProductsQuery,
} from "../../../gql/graphql";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import SaveForLaterUI from "./SaveForLaterUI";

interface CartItemProps {
  channel: string;
}

const CartItemUI: React.FC<CartItemProps> = ({ channel }) => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    addToCart,
  } = useCart();
  const { user } = useUser();
  const userId = user?.id;

  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [addProductSaveForLater] = useAddProductSaveForLaterMutation();

  const { data, refetch } = useViewSaveLaterProductsQuery({
    variables: { userId: userId as string, channel },
    skip: !userId,
  });

  useEffect(() => {
    if (data?.sflView) {
      const formattedData = data.sflView.map((sfl) => ({
        id: sfl?.product?.id ?? "",
        mainImage: sfl?.product?.media?.[0]?.url ?? "",
        name: sfl?.product?.name,
        price:
          sfl?.product?.pricing?.priceRangeUndiscounted?.start?.net?.amount,
        currency:
          sfl?.product?.pricing?.priceRangeUndiscounted?.start?.net?.currency,
      }));
      setSavedItems(formattedData);
    }
  }, [data]);

  const handleSaveForLater = async (itemId: string) => {
    if (!userId) {
      toast.error("Please login to save for later");
      return;
    }

    try {
      const response = await addProductSaveForLater({
        variables: { userId, productId: itemId, action: "add" },
      });

      if (response.data?.sflAdd?.success) {
        toast.success("Product saved for later");
        removeFromCart(itemId);
        refetch();
      } else {
        toast.error("Failed to save product for later");
      }
    } catch (error) {
      console.error("Error saving product for later:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleRemoveFromSaveForLater = (id: string) => {
    // Remove logic here (API call if needed)
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    const itemToMove = savedItems.find((item) => item.id === id);
    if (itemToMove) {
      addToCart(itemToMove);
      handleRemoveFromSaveForLater(id);
      toast.success("Product moved to cart");
    }
  };

  return (
    <>
      <div className="border-[1px] border-[#e0e0e0] rounded-2xl mb-5 p-5">
        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start md:items-center justify-between my-10"
          >
            {/* Product Image */}
            <div>
              <Image
                src={item.mainImage}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-28 lg:w-28 lg:h-36"
              />
            </div>

            {/* Product Details */}
            <div className="w-[60%] md:w-[70%] xl:w-[82%] flex flex-col gap-2 lg:flex-row lg:justify-between">
              <div className="lg:w-[70%]">
                <h4 className="font-medium">{item.name}</h4>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-textgray underline mt-1"
                >
                  Remove item
                </button>
                <button
                  onClick={() => handleSaveForLater(item.id)}
                  className="text-xs text-textgray underline mt-1 ml-4"
                >
                  Save for later
                </button>
              </div>

              {/* Price and Quantity Controls */}
              <div className="lg:w-[20%]">
                <p className="text-lg font-semibold my-2">
                  {item.currency} {(item.price ?? 0).toFixed(2)}
                </p>
                <div className="flex px-2 gap-x-4 py-1 items-center border-[1px] border-borderColor rounded-full justify-between">
                  {item.quantity === 1 ? (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded flex items-center"
                    >
                      <FaTrashAlt className="text-sm text-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="rounded flex items-center"
                    >
                      <AiOutlineMinus className="text-sm" />
                    </button>
                  )}
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="rounded flex items-center"
                  >
                    <AiOutlinePlus className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save For Later Section */}
      {savedItems.length > 0 && (
        <div className="p-4 border-2 border-success rounded-2xl">
          <h1 className="text-success text-lg mb-4">Save For Later</h1>
          {savedItems.map((item) => (
            <SaveForLaterUI
              key={item.id}
              item={item}
              removeFromSaveForLater={handleRemoveFromSaveForLater}
              moveToCart={handleMoveToCart}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CartItemUI;