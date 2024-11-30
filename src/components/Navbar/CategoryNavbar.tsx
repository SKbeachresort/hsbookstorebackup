"use client";
import React from "react";
import { useFetchAllCategoriesQuery } from "../../../gql/graphql";
import Link from "next/link";

export const CategoryNavbar = () => {
  const { data: categoriesData } = useFetchAllCategoriesQuery();

  const categories = categoriesData?.categories?.edges ?? [];

  return (
    <div className="flex flex-row gap-x-4">
      {categories.map((category) => (
        <Link href={`/category/${category.node.slug}`} key={category.node.id}>
          <p className="text-sm lg:text-md font-medium text-white">
            {category.node.name}
          </p>
        </Link>
      ))}
    </div>
  );
};