"use client";

import { executeGraphQL } from "@/lib/graphql";
import { useAddProductToWishlistMutation } from "../../../../../../../../gql/graphql";
import toast from "react-hot-toast";
import { useWishlistViewQuery } from "../../../../../../../../gql/graphql";

interface RemoveButtonProps {
  itemId: string;
  userId: string;
  channel: string;
}

const RemoveButton = ({ itemId, userId, channel }: RemoveButtonProps) => {
  
    const { refetch } = useWishlistViewQuery({
    variables: { channel: channel, userId: userId },
  });

  const [removeProductToWishlist] = useAddProductToWishlistMutation();

  const handleRemoveFromWishList = async () => {
    try {
      const response = await removeProductToWishlist({
        variables: {
          userId: userId,
          productId: itemId,
          action: "delete",
        },
      });

      console.log("Response", response);

      if (response?.data?.wishlistAdd?.success) {
        toast.success("Product removed from wishlist");
        refetch();  
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Error removing product from wishlist");
    }
  };

  return (
    <button
      onClick={handleRemoveFromWishList}
      className="bg-red-500 hover:scale-110 transition-all text-white px-4 py-2 my-2 rounded"
    >
      Remove
    </button>
  );
};

export default RemoveButton;