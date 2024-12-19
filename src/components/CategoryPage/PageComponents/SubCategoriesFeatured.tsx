"use server";
import React from "react";
import { FetchFeaturedCategoriesDocument } from "../../../../gql/graphql-documents";
import { executeGraphQL } from "@/lib/graphql";
import Link from "next/link";
import Image from "next/image";
import { getRegionUrl } from "@/utils/regionUrl";
import dentistry from "../../../../public/category/medicalbooks.png";

interface SubFeaturedCategoriesProps {
  channel: string;
  locale: string;
  categoryslug: string;
  subcategoryslug: string;
};

export const SubFeaturedCategories: React.FC<
  SubFeaturedCategoriesProps
> = async ({ channel, locale, categoryslug, subcategoryslug }) => {
  
  const data = await executeGraphQL(FetchFeaturedCategoriesDocument, {
    variables: {
      first: 20,
      level: 2,
    },
  });

  const filteredCategories =
    data?.categories?.edges?.filter(({ node }) => {
      return node?.parent?.slug === subcategoryslug;
    }) || [];

  return (
    <div className="">

      {filteredCategories.length > 0 && (
        <h1 className="text-lg font-semibold text-center my-4">
          Featured Categories
        </h1>
      )}
      
      <div
        className={`flex flex-row flex-wrap gap-2 md:gap-y-4 md:gap-0 justify-center ${
          filteredCategories.length > 3
            ? "md:justify-between"
            : "md:justify-center"
        }`}
      >
        {filteredCategories?.map(({ node }) => (
          <div
          key={node.id}
          className="md:w-[18%] rounded-md overflow-hidden flex flex-col items-start"
        >
          <div className="w-full h-full">
            <Link
              href={getRegionUrl(
                channel,
                locale,
                `category/${categoryslug}/${subcategoryslug}/${node.slug}`
              )}
            >
              <div className="">
                <Image
                  src={node.backgroundImage?.url || ""}
                  alt={node.name}
                  width={150}
                  height={150}
                  className="md:w-[90%] rounded-lg bg-[#EEEEF0] object-contain aspect-square mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
                />
              </div>

              <h2 className="text-[0.5rem] md:text-xs 3xl:text-md font-semibold text-center mt-2">
                {node.name}
              </h2>
            </Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};
