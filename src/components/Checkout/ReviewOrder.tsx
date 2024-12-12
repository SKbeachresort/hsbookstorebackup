"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckOutWidget } from "@/components/Cart/CheckOutWidget";
import DeliveryAddressCard from "@/components/Cart/DeliveryAddressCard";
import CartItemUI from "@/components/Cart/CartItemUI";
import RadioButton from "@/app/elements/RadioButton";

export const ReviewOrder = () => {
  
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  const shippingMethods = JSON.parse(localStorage.getItem("shippingMethodId") || "[]");
  const shippingAddress = localStorage.getItem("shippingAddress");
  const parsedShippingAddress = shippingAddress
    ? JSON.parse(shippingAddress)
    : null;

  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);

  const handleRadioChange = (id: string) => {
    setSelectedShippingMethod(id);
    // localStorage.setItem("shippingMethodId", id); 
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">
        Checkout ({cartItems.length} items){" "}
      </h1>

      {/* Delivery Address */}
      <div className="my-2 border-[1px] border-disableGray p-5 rounded-md">
        <div className="mb-4">
          <h1 className="mb-3 text-lg font-semibold">Shipping Address</h1>
          {parsedShippingAddress ? (
            <div className="text-textgray mb-2">
              <p className="text-sm">
                {parsedShippingAddress.firstName}{" "}
                {parsedShippingAddress.lastName}
              </p>
              <p className="text-sm">
                {parsedShippingAddress.country.country},{" "}
              </p>
              <p className="text-sm">
                {parsedShippingAddress.streetAddress1}
                {parsedShippingAddress.streetAddress2 && (
                  <span>, {parsedShippingAddress.streetAddress2}</span>
                )}
              </p>
              <span>{parsedShippingAddress.city}</span>
              <p className="text-sm">{parsedShippingAddress.postalCode}</p>

              <p className="text-sm">{parsedShippingAddress.phone}</p>
            </div>
          ) : (
            <p className="text-sm text-red-500">No shipping address found.</p>
          )}
        </div>

        <div>
          <h1 className="mb-3 text-lg font-semibold">Billing Address</h1>
          {parsedShippingAddress ? (
            <div className="text-textgray mb-2">
              <p className="text-sm">
                {parsedShippingAddress.firstName}{" "}
                {parsedShippingAddress.lastName}
              </p>
              <p className="text-sm">
                {parsedShippingAddress.country.country},{" "}
              </p>
              <p className="text-sm">
                {parsedShippingAddress.streetAddress1}
                {parsedShippingAddress.streetAddress2 && (
                  <span>, {parsedShippingAddress.streetAddress2}</span>
                )}
              </p>
              <span>{parsedShippingAddress.city}</span>
              <p className="text-sm">{parsedShippingAddress.postalCode}</p>

              <p className="text-sm">{parsedShippingAddress.phone}</p>
            </div>
          ) : (
            <p className="text-sm text-red-500">No shipping address found.</p>
          )}
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

      <div className="my-3">
        <h1 className="text-lg font-semibold mb-2">Shipping Methods</h1>
        {shippingMethods.length > 0 ? (
          <div className=" gap-4">
            {shippingMethods.map((method: any) => (
              <div
                key={method.id}
                className={`border-2 w-full ${
                  selectedShippingMethod === method.id ? "border-secondary" : "border-disableGray"
                } rounded-lg p-4`}
              >
                <RadioButton
                  label={`${method.name} (${method.price.amount} ${method.price.currency})`}
                  name="shippingMethod"
                  value={method.id}
                  checked={selectedShippingMethod === method.id}
                  onChange={() => handleRadioChange(method.id)} // Pass the ID
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-textgray text-sm">No shipping methods available.</p>
        )}
      </div>
    </div>
  );
};