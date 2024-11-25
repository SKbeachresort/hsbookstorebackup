"use client";   
import React, { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  currency?: string;
  mainImage: string;
};

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productid: string) => void;
  incrementQuantity: (productid: string) => void;
  decrementQuantity: (productid: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productid: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productid));
  };

  const incrementQuantity = (productid: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productid: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productid && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const updatedCart = updatedItems.filter((item) => item.quantity > 0);
      if (updatedItems.some((item) => item.id === productid && item.quantity === 0)) {
        toast.error("Product removed from cart");
      }
      return updatedCart;
    });
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};