"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchProductsQuery } from "../../../gql/graphql";
import { MdClose } from "react-icons/md";

import { Button } from "@/components/ui/button";

type SearchingProductsResultsProps = {
  data: SearchProductsQuery | undefined;
  searchTerm: string;
  setIsReady: (value: boolean) => void;
};

const SearchingProductResults = ({
  searchTerm,
  data,
  setIsReady,
}: SearchingProductsResultsProps) => {
  const searchResults = data?.products?.edges;

  return (
    <div className="">
      <div className="absolute bg-white z-50 border-2 left-0 top-[110%] flex w-full flex-col gap-4 rounded-xl p-4 shadow-xl">
        <div className="flex flex-row-reverse justify-between items-center">
          <div
            onClick={() => setIsReady(false)}
            className="bg-primary p-1"
          >
            <MdClose size={20} color="white"/>
          </div>
          <h2 className="hidden text-lg font-semibold text-secondary-foreground sm:block">
            Searching
          </h2>
        </div>

        {searchResults && searchResults.length > 0 ? (
          <>
            <ul className="flex max-h-[150px] list-inside list-none flex-col gap-2 overflow-y-scroll sm:max-h-fit sm:overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  key={product?.node?.id}
                  href={`/product/${product.node.slug}`}
                  prefetch={false}
                  className="flex items-center gap-2 p-2 text-card-foreground/70 transition-colors hover:bg-card-foreground/10 hover:text-card-foreground"
                  onClick={() => setIsReady(false)}
                >
                  {product?.node.thumbnail?.url ? (
                    <Image
                      src={product?.node.thumbnail?.url || ""}
                      alt={product?.node?.name || "product image"}
                      width={30}
                      height={30}
                      quality={50}
                      className="h-auto w-[30px] object-cover"
                    />
                  ) : (
                    <div className="aspect-[30/40] w-[30px] bg-card-foreground/25"></div>
                  )}
                  <li>{product?.node?.name}</li>
                </Link>
              ))}
            </ul>
            <Link
              href={`/search?query=${searchTerm.trim()}`}
              className="text-card-foreground underline hover:text-card-foreground/80"
              prefetch={false}
              onClick={() => setIsReady(false)}
            >
              See all Results
            </Link>
          </>
        ) : (
          <p className="text-center font-medium">No Results Found</p>
        )}
      </div>
    </div>
  );
};

export default SearchingProductResults;
