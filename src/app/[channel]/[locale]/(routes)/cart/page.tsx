"use client";
import { useCart } from "@/context/CartContext";
import { CheckOutWidget } from "@/components/Cart/CheckOutWidget";
import DeliveryAddressCard from "@/components/Cart/DeliveryAddressCard";
import CartItemUI from "@/components/Cart/CartItemUI";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useViewSaveLaterProductsQuery } from "../../../../../../gql/graphql";
import { FaPlus, FaTrashAlt, FaMinus } from "react-icons/fa";

const CartPage = () => {
  const { channel, locale } = useParams();

  const { user } = useUser();
  const userId = user?.id;

  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const { data, refetch } = useViewSaveLaterProductsQuery({
    variables: { userId: userId as string, channel: channel as string },
    skip: !userId,
  });

  const savedItems = data?.sflView ?? [];
  console.log("Saved Items", savedItems);

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="w-[95%] xl:w-[85%] py-5 3xl:w-[75%] mx-auto sm:px-10 lg:px-12">
      {cartItems.length === 0 && savedItems.length == 0 && (
        <div className="text-center py-10">
          <h1 className="text-xl font-semibold">Your cart is empty</h1>
        </div>
      )}

      <div className="">

        <h1 className="text-xl font-semibold ">
          Cart ({cartItems.length} items){" "}
        </h1>

        <div className="relative h-auto flex-col flex md:flex-row justify-between ">
          <div className="md:w-[55%] lg:w-[67%] py-5">
            {/* Delivery Address */}
            {cartItems.length > 0 && <DeliveryAddressCard />}

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
    </div>
  );
};

export default CartPage;