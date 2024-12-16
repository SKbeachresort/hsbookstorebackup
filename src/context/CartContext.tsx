"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";

interface CartItem {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  currency?: string;
  mainImage: string;
  variantId: string;
};

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productid: string) => void;
  incrementQuantity: (productid: string) => void;
  decrementQuantity: (productid: string) => void;
  clearCart: () => void;
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
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = getCookie("cartItems") || localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart as string));
      } catch (error) {
        console.error("Error parsing cart items from cookies", error);
      }
    }
  }, []);

  useEffect(() => {
    if(cartItems.length === 0) return;
    const cartString = JSON.stringify(cartItems);

    setCookie("cartItems", cartString, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    localStorage.setItem("cartItems", cartString);
  }, [cartItems]);

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
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productid)
    );
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
      if (
        updatedItems.some(
          (item) => item.id === productid && item.quantity === 0
        )
      ) {
        toast.error("Product removed from cart");
      }
      return updatedCart;
    });
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const clearCart = () => {
    setCartItems([]); 
    setCookie("cartItems", "[]", { 
      path: "/",
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    localStorage.removeItem("cartItems"); 
    toast.success("Cart cleared successfully!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        totalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};