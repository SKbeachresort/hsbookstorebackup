"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useProductBundlesQuery } from "../../../gql/graphql";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { FaPlus, FaTrashAlt, FaMinus } from "react-icons/fa";

interface SavingPackagesProps {
  channel: string;
  productId: string;
};

const SavingsPackage: React.FC<SavingPackagesProps> = ({
  channel,
  productId,
}) => {

  const {
    addToCart,
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const [isInCart, setIsInCart] = useState(false);

  const { data, loading, error } = useProductBundlesQuery({
    variables: {
      channel,
      productId,
    },
  });

  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.id === productId);
    setIsInCart(!!itemInCart);
  }, [cartItems, productId]);

  console.log("Bundles", data);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data?.allBundles?.length) {
      const bundleA = data.allBundles.find(
        (bundle) => bundle?.key === "Bundle-A"
      );
      if (bundleA) {
        const initialSelected = bundleA?.products
          ?.map((product) => product?.id)
          .filter((id): id is string => !!id);
        setSelectedProducts(initialSelected || []);
        const initialTotal = bundleA?.products?.reduce(
          (sum, product) =>
            sum +
            (product?.pricing?.priceRangeUndiscounted?.start?.net?.amount || 0),
          0
        );
        setTotal(initialTotal || 0);
      }
      setIsInCart(true);
    }
  }, [data]);

  const toggleSelection = (productId: string, price: number) => {
    const isSelected = selectedProducts.includes(productId);
    const updatedSelected = isSelected
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(updatedSelected);

    const updatedTotal = isSelected ? total - price : total + price;
    setTotal(updatedTotal);
  };

  const allBundles = data?.allBundles ?? [];
  const bundleA = data?.allBundles?.find(
    (bundle) => bundle?.key === "Bundle-A"
  );

  const handleAddToCart = () => {
    const bundleA = data?.allBundles?.find(
      (bundle) => bundle?.key === "Bundle-A"
    );

    if (!bundleA || !bundleA.products) return;

    bundleA.products.forEach((product) => {
      if (product?.id && selectedProducts.includes(product.id)) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.pricing?.priceRangeUndiscounted?.start?.net?.amount,
          currency:
            product.pricing?.priceRangeUndiscounted?.start?.net?.currency,
          mainImage: product?.thumbnail?.url || "",
          quantity: 1,
          variantId: product?.variants?.[0]?.id || "",
        });
      }
    });

    toast.success("Bundle added to cart successfully!");
    setIsInCart(true);
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    setIsInCart(false);
  };

  const getQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleIncrementQuantity = (id: string) => {
    incrementQuantity(id);
  };

  const handleDecrementQuantity = (id: string) => {
    const quantity = getQuantity(id);
    if (quantity === 1) {
      handleRemoveFromCart(id);
    } else {
      decrementQuantity(id);
    }
  };

  const quantity = getQuantity(productId);
  
  return (
    <>
      {allBundles?.length > 0 && (
        <div className="my-5">
          <h2 className="text-xl font-semibold my-4">Savings Package</h2>

          <div className="flex flex-col xl:flex-row items-center md:items-start xl:items-center xl:gap-6">
            <div className="flex flex-row gap-2 md:gap-4">
              {bundleA?.products?.map((product) => {
                const price =
                  product?.pricing?.priceRangeUndiscounted?.start?.net
                    ?.amount || 0;
                return (
                  <div
                    key={product?.id}
                    className="flex flex-col md:flex-row justify-between md:justify-start items-start gap-2 md:gap-3 rounded-md p-2 md:p-4 w-24 md:w-44 cursor-pointer"
                  >
                    {product?.id && (
                      <button
                        onClick={() => toggleSelection(product?.id, price)}
                        className="mb-2 text-md md:text-xl"
                      >
                        {selectedProducts.includes(product?.id) ? (
                          <FaCheckSquare className="text-secondary" />
                        ) : (
                          <FaRegSquare className="text-secondary" />
                        )}
                      </button>
                    )}

                    <div>
                      {product?.thumbnail && (
                        <Image
                          src={product?.thumbnail?.url}
                          alt={product?.name}
                          width={120}
                          height={170}
                          className="object-fill aspect-[3/4] resize lg:max-h-[135px] xl:max-h-[170px] 3xl:w-[230px] 3x:h-[270px] w-full hover:scale-110 transition-all duration-300"
                        />
                      )}
                      <p className="text-justify my-2 text-[0.6rem] md:text-xs font-normal">
                        {product?.name}
                      </p>
                      {/* <p className="text-sm font-semibold">
                        Price: {price} KWD
                      </p> */}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-md text-center">
              <p className="text-xl font-semibold my-1">
                Total: {total.toFixed(2)} KWD
              </p>
              {bundleA?.discount && (
                <p className="text-success text-sm">
                  You Save: {bundleA?.discount[0]}%
                </p>
              )}


              {isInCart ? (
                <div className="bg-secondary text-white rounded-full font-medium text-md px-3 py-2 mt-2">
                  <div className="flex items-center justify-center space-x-2">
                    {quantity === 1 ? (
                      <FaTrashAlt
                        className="cursor-pointer text-xs"
                        onClick={() => handleRemoveFromCart(productId)}
                      />
                    ) : (
                      <FaMinus
                        className="cursor-pointer text-xs"
                        onClick={() => handleDecrementQuantity(productId)}
                      />
                    )}
                    <span className="text-xs">{quantity}</span>
                    <FaPlus
                      className="cursor-pointer text-xs"
                      onClick={() => handleIncrementQuantity(productId)}
                    />
                  </div>
                </div>
              ) : (
                <button
                  className="bg-secondary text-white rounded-full font-medium text-md px-4 py-2 mt-2"
                  onClick={handleAddToCart}
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavingsPackage;
