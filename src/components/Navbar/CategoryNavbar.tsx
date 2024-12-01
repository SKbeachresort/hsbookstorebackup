"use client";
import React from "react";
import { useFetchAllCategoriesQuery } from "../../../gql/graphql";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

export const CategoryNavbar = () => {
  const { getRegionUrl } = useRegionUrl();
  const { data: categoriesData } = useFetchAllCategoriesQuery();

  const categories = categoriesData?.categories?.edges ?? [];

  return (
    <div className="flex flex-row gap-x-4">
      {categories.map((category) => (
        <Link href={getRegionUrl(`category/${category.node.slug}`)} key={category.node.id}>
          <p className="text-sm lg:text-md font-medium text-white">
            {category.node.name}
          </p>
        </Link>
      ))}
    </div>
  );
};