import React from "react";
import { WishlistViewDocument } from "../../../../../../../../gql/graphql-documents";
import { executeGraphQL } from "@/lib/graphql";
import Image from "next/image";
import Link from "next/link";
import RemoveButton from "./RemoveButton";

interface MyWishlistPageProps {
  params: {
    channel: string;
    locale: string;
    myUserId: string;
  };
};

const MyWishlistPage = async ({ params }: MyWishlistPageProps) => {
  const { channel, myUserId } = params;

  const data = await executeGraphQL(WishlistViewDocument, {
    variables: {
      channel: channel as string,
      userId: myUserId,
    },
  });

  const wishlistItems = data?.wishlistView || [];

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12">
      <h1 className="text-2xl font-semibold text-center my-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="">
          {wishlistItems.map((item) => (
            <div
              key={item?.id}
              className="flex items-start md:items-center rounded-md justify-between my-10 bg-white shadow-md border-[1px] border-disableGray p-4 gap-6"
            >
              <div>
                <Image
                  src={item?.product?.thumbnail?.url || ""}
                  alt={item?.product?.name || ""}
                  width={80}
                  height={80}
                  className="w-20 h-28 lg:w-28 lg:h-36"
                />
              </div>

              <div className="w-[60%] md:w-[70%] xl:w-[82%] flex flex-col gap-2 lg:flex-row lg:justify-between">
                <div className="lg:w-[70%]">
                  <h4 className="font-medium text-lg">{item?.product?.name}</h4>

                  <Link href={`/product/${item?.product?.slug}`}>
                    <button className="bg-secondary text-white hover:scale-110 transition-all px-4 py-2 my-2 rounded">
                      View Product
                    </button>
                  </Link>
                </div>

                <div className="lg:w-[20%]">
                  <p className="text-lg font-semibold my-2">
                    {
                      item?.product?.pricing?.priceRangeUndiscounted?.start
                        ?.currency
                    }{" "}
                    {(
                      item?.product?.pricing?.priceRangeUndiscounted?.start?.net
                        ?.amount ?? 0
                    ).toFixed(2)}
                  </p>
                  {/* {item?.id && (
                    <RemoveButton itemId={item.id} userId={myUserId} channel={channel}/>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlistPage;