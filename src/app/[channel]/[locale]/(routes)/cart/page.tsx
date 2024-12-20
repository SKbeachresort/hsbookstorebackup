"use client";
import { useCart } from "@/context/CartContext";
import { CheckOutWidget } from "@/components/Cart/CheckOutWidget";
import DeliveryAddressCard from "@/components/Cart/DeliveryAddressCard";
import CartItemUI from "@/components/Cart/CartItemUI";
import { useParams } from "next/navigation";

const CartPage = () => {
  const { channel, locale } = useParams();

  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

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
              <div className="">
                <CartItemUI channel={channel as string} />
              </div>

              {/* Save for Later  */}
            </div>
            <div className="md:w-[40%] lg:w-[30%] h-auto">
              <div className="sticky top-10 py-5 z-40">
                <CheckOutWidget
                  totalAmount={totalAmount}
                  cartItems={cartItems}
                  channel={channel as string}
                  locale={locale as string}
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