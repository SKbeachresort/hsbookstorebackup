"use client";
import React from "react";
import { FiTruck } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "@/app/context/CartContext"; 
import { products } from "@/app/data/Products";

const CartPage = () => {
  const { cartItems, incrementQuantity, decrementQuantity } = useCart();
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-[90%] md:w-[75%] h-screen my-[4vh] mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Cart Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">
              Cart ({cartItems.length} items)
            </h2>
            <div className="bg-white p-4 shadow rounded">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-lg">
                  <FiTruck />
                  <h3 className="font-medium">Delivery details</h3>
                </div>
                <p className="text-sm">Shipping arrives on: June 5</p>
                <p className="text-xs text-gray-500">
                  * for orders made by 4pm
                </p>
                <p className="text-xs">ID 456789</p>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <button className="text-sm text-red-500 mt-1">
                        Remove item
                      </button>
                      <button className="text-sm text-blue-500 mt-1 ml-2">
                        Save for later
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {item.currency} {item.price.toFixed(3)}
                    </p>
                    <div className="flex items-center justify-end mt-1">
                      <button
                        // onClick={() => decrementQuantity(item)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        // onClick={() => incrementQuantity(item)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Summary */}
          <div className="w-full lg:w-1/3 bg-white p-4 shadow rounded">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="mb-2">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>
                  KWD {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  KWD {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-secondary text-white font-semibold rounded">
              Checkout
            </button>
            <p className="text-sm text-center mt-2">
              For the best experience{" "}
              <a href="#" className="text-blue-500">
                sign in
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
