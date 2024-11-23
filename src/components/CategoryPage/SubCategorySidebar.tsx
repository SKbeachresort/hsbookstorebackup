// app/components/SubCategorySidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useParams } from "next/navigation";
import { CategoryList, Category, Subcategory } from "@/data/Category";
import Accordion from "@/app/elements/Accordion"; 
import Link from "next/link";

const renderNestedAccordion = (subcategories: (string | Subcategory)[], parentSlug: string,) => {
  return subcategories.map((subcategory, index) => {
    if (typeof subcategory === "string") {
      const subCategorySlug = subcategory.toLowerCase().replace(/ /g, "-");
      return (
        <div key={index}>
          <Link
            href={`/category/${parentSlug}/${subCategorySlug}`}
            className="text-[#525252] text-sm my-4 font-medium"
          >
            {subcategory}
          </Link>
        </div>
      );
    }

    const subCategorySlug = subcategory.subcategory.toLowerCase().replace(/ /g, "-");

    return (
      <div key={index}>
        <Link
          href={`/category/${parentSlug}/${subCategorySlug}`}
          className="text-[#272727] text-sm my-3 font-medium"
        >
          {subcategory.subcategory}
        </Link>

        {/* Render topics if they exist */}
        {subcategory.topics && (
          <div className="pl-4">
            {subcategory.topics.map((topic, topicIndex) => (
              <Link
                key={topicIndex}
                href={`/category/${parentSlug}/${subCategorySlug}/${topic.toLowerCase().replace(/ /g, "-")}`}
                className="text-textgray text-sm "
              >
                <p className="my-1">{topic}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  });
};

export const SubCategorySidebar = () => {
  const { categoryslug, subcategoryslug, topicslug } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categoryslug && typeof categoryslug === "string") {
      setActiveCategory(categoryslug.replace(/-/g, " ").toLowerCase());
    }
  }, [categoryslug]);

  const handleToggle = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category.toLowerCase());
    }
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-12"
      } p-[1vh] lg:p-3 text-wrap border-r-2 border-blue-50 flex flex-col pt-3 relative duration-300`}
    >
      <IoIosArrowDropleftCircle
        className={`absolute z-30 text-lg md:text-2xl text-primary cursor-pointer w-[3.5vh] lg:w-[4vh] -right-[2vh] top-5 border-1 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div>
          {CategoryList.map((categoryItem, index) => {
            const slug = categoryItem.category.toLowerCase().replace(/ /g, "-");
            const isActiveCategory = activeCategory === categoryItem.category.toLowerCase();

            return (
              <Accordion
                key={index}
                title={categoryItem.category}
                isActive={isActiveCategory}
                onToggle={() => handleToggle(categoryItem.category)}
              >
                <div className="pl-2 pt-2">
                  {categoryItem.subcategories && renderNestedAccordion(categoryItem.subcategories, slug)}
                </div>
              </Accordion>
            );
          })}
        </div>
      )}
    </div>
  );
};