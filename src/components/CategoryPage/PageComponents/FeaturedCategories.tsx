import React from "react";
import { useFetchFeaturedCategoriesQuery } from "../../../../gql/graphql";
import ZoomInSlideUp from "@/components/Animated/ZoomInSlideUp";
import Link from "next/link";
import Image from "next/image";
import { useRegionUrl } from "@/hooks/useRegionUrl";

interface FeaturedCategoriesProps {
  categoryslug: string;
};

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categoryslug,
}) => {
  
  const { getRegionUrl } = useRegionUrl();
  const { data, loading, error } = useFetchFeaturedCategoriesQuery();

  const categories = data?.categories?.edges;

  return (
    <div className="h-screen">
      <h1 className="text-lg font-semibold text-center my-4">
        Featured Categories
      </h1>

      <div className="flex flex-row flex-wrap gap-2 md:gap-0 justify-center md:justify-between">
        {categories?.map(({ node }) => (
          <div
            key={node.id}
            className="md:w-[15%] rounded-md flex justify-center flex-col items-center"
          >
            <ZoomInSlideUp>
              <Link
                href={getRegionUrl(`category/${categoryslug}/${node.slug}`)}
              >
                <Image
                  src={node?.backgroundImage?.url || ""}
                  alt={node.name}
                  width={150}
                  height={150}
                  className="md:w-[100%]  mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
                />
                <h2 className="text-[0.6rem] md:text-xs 3xl:text-md font-semibold text-center mt-2">
                  {node.name}
                </h2>
              </Link>
            </ZoomInSlideUp>
          </div>
        ))}
      </div>
    </div>
  );
};