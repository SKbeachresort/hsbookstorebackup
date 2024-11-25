"use client";
import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/Products";
import { capitalizeWords } from "@/utils/Capitalize";

const NestedSubCategory = () => {
  const { categoryslug, subcategoryslug, topicslug } = useParams();

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const formattedTopicSlug =
    typeof topicslug === "string" ? capitalizeWords(topicslug) : "";

  return (
    <div className="w-[100%] py-2 px-5 h-full">
      <div>
        <span className="text-md my-4 text-textgray">
          {formattedCategorySlug}/{formattedSubCategorySlug}/
          {formattedTopicSlug}
        </span>
      </div>

      <div>
        <h1 className="text-xl my-4 font-medium">
          Explore {formattedTopicSlug}
        </h1>
      </div>
    </div>
  );
};


export default NestedSubCategory;