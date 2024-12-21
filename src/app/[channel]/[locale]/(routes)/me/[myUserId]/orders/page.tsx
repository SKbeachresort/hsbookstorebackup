"use client";
import React from "react";
import { executeGraphQL } from "@/lib/graphql";
import { useUserQuery } from "../../../../../../../../gql/graphql";
import { useParams } from "next/navigation";
import { UserOrderDetailsDocument } from "../../../../../../../../gql/graphql-documents";
import { LanguageCodeEnum } from "../../../../../../../../gql/graphql-documents";
import { useUserOrderDetailsQuery } from "../../../../../../../../gql/graphql";
import Image from "next/image";
import Link from "next/link";
import BackDropLoader from "@/app/elements/BackdropLoader";

interface OrderPageProps {
  params: {
    channel: string;
    locale: string;
    myUserId: string;
  };
}

const MyOrdersPage = () => {
  // const { channel, locale } = useParams();

  const { channel } = useParams();
  const { data, loading: orderLoading } = useUserOrderDetailsQuery({
    variables: {
      channel: channel as string,
    },
  });

  // const data = await executeGraphQL(UserOrderDetailsDocument, {
  //   variables: {
  //     channel: channel,
  //   },
  // });
  console.log("Order Data", data);

  const orderData = data?.user?.checkouts?.edges || [];

  if (orderLoading) {
    return;
  }

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto  sm:px-10 lg:px-12">
      <h1 className="text-center text-xl font-semibold my-6">My Orders Page</h1>

      {orderLoading && <BackDropLoader open={orderLoading} />}

      <div>
        {orderData.length === 0 ? (
          <p className="text-center text-textColor">No orders found.</p>
        ) : (
          orderData.map(({ node }) => (
            <div key={node.id} className="border p-4 mb-6 shadow-md">
              {/* Order Info */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="hidden md:block text-sm font-semibold text-primary">Order ID: {node?.id}</p>
                  <p className="text-sm text-secondary">
                    <span className="font-semibold">Email:</span> {node.email}
                  </p>
                </div>
                <div className="text-sm font-semibold bg-green-200 text-green-800 px-3 py-1 rounded-full">
                  Payment Status: Paid
                </div>
              </div>

              {/* Checkout Lines */}
              <div className="space-y-4">
                {node.lines.map((line) => (
                  <div
                    key={line.id}
                    className="flex flex-col md:flex-row items-center md:justify-between border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <Image
                        src={line?.variant?.product?.thumbnail?.url || ""}
                        alt={
                          line?.variant?.product?.thumbnail?.alt ||
                          "Product Image"
                        }
                        width={80}
                        height={80}
                        className=""
                      />
                      <div>
                        <p className="text-lg font-medium">
                          {line.variant.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Variant: {line.variant.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {line.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-textColor">
                        {line.totalPrice.gross.amount.toFixed(2)}{" "}
                        {line.totalPrice.gross.currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="flex justify-end mt-4">
                <p className="text-lg font-bold text-textColor">
                  Total Price: {node.totalPrice.gross.amount.toFixed(2)}{" "}
                  {node.totalPrice.gross.currency}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
