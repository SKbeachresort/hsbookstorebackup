"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useParams } from "next/navigation";
import { CategoryList } from "@/app/data/Category";
import { FaChevronDown } from "react-icons/fa6";
import Link from "next/link";

export const SubCategorySidebar = () => {

  const { categoryslug } = useParams();
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
        open ? "w-[18vw]" : "w-[5vh] lg:w-[0vh]"
      } shadow-md p-[1vh] lg:p-[3vh] text-wrap border-2 border-blue-50 flex flex-col pt-[4vh] relative duration-300`}
    >
      <IoIosArrowDropleftCircle
        className={`absolute z-30 text-[3vh] md:text-[5vh] text-primary cursor-pointer w-[3.5vh] lg:w-[4vh] -right-[2vh] top-[6vh] border-1 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div>
          {CategoryList.map((categoryItem, index) => {
            const slug = categoryItem.category.toLowerCase().replace(/ /g, "-");
            return (
              <div key={index} className="mb-4">
                <Link href={`/category/${slug}`}>
                  <div
                    className={`flex justify-between items-center p-[1vh] cursor-pointer text-primary border-b-[1px] border-textgray font-medium 
                  
                    `}
                    onClick={() => handleToggle(categoryItem.category)}
                  >
                    <span className="text-[2.3vh] font-medium">
                      {categoryItem.category}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        activeCategory === categoryItem.category.toLowerCase()
                          ? "rotate-180"
                          : ""
                      }`}
                    >
                      <FaChevronDown className="text-[2.2vh]" />
                    </span>
                  </div>
                </Link>

                {activeCategory === categoryItem.category.toLowerCase() && (
                  <div className="pl-[2vh] pt-2">
                    {categoryItem.subcategories.map((subCategory, subIndex) => {
                      const subcategoryslug = subCategory
                        .toLowerCase()
                        .replace(/ /g, "-");
                      return (
                        <Link
                          href={`/category/${slug}/${subcategoryslug}`}
                        >
                          <div
                            key={subIndex}
                            className="text-textgray text-[2vh] my-2 underline"
                          >
                            {subCategory}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};