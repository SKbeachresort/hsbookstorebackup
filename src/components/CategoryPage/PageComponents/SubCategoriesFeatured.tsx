"use server";
import React from "react";
import { FeaturedCategoriesBySlugAndMetaDocument } from "../../../../gql/graphql-documents";
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
  const data = await executeGraphQL(FeaturedCategoriesBySlugAndMetaDocument, {
    variables: {
      first: 20,
      filter: {
        slugs: [subcategoryslug],
        metadata: [
          {
            key: "Featured",
            value: "Y",
          },
        ],
      },
      sortBy: {
        direction: "ASC",
        field: "NAME",
      },
    },
  });

  const parentNode = data?.categories?.edges?.[0]?.node;
  const children = parentNode?.children?.edges || [];

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center my-4">
        Featured Categories
      </h1>

      <div className="flex flex-row flex-wrap gap-2 md:gap-y-4 md:gap-0 justify-center md:justify-between">
        {children?.slice(0, 10).map(({ node }) => (
          <div
            key={node.id}
            className="md:w-[18%] rounded-md flex gap-y-2 justify-center flex-col items-start"
          >
            <Link
              href={getRegionUrl(
                channel,
                locale,
                `category/${categoryslug}/${subcategoryslug}/${node.slug}`
              )}
            >
              <div className="">
                <Image
                  src={node.backgroundImage?.url || dentistry}
                  alt={node.name}
                  width={150}
                  height={150}
                  className="md:w-[90%] rounded-lg bg-[#EEEEF0] object-contain aspect-square mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
                />
              </div>

              <h2 className="text-[0.6rem] md:text-xs 3xl:text-md font-semibold text-center">
                {node.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};