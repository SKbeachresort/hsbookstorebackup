"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

interface CategoryProps {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

export const HomeCategory = () => {
  const categorySection: CategoryProps[] = [
    {
      id: 1,
      name: "Shop for Books",
      imageUrl: "/category/medicalbooks.png",
      slug: "books",
    },
    {
      id: 2,
      name: "Shop for Medical Devices",
      imageUrl: "/category/medicaldevices.png",
      slug: "medical-devices",
    },
    {
      id: 3,
      name: "Shop for Stethoscopes",
      imageUrl: "/category/sthethoscope.png",
      slug: "sthethoscopes",
    },
    {
      id: 4,
      name: "Shop for Scrubs",
      imageUrl: "/category/scrubs.png",
      slug: "scrubs",
    },
    {
      id: 5,
      name: "Shop for Clipboards",
      imageUrl: "/category/clipboard.png",
      slug: "clipboards",
    },
  ];

  return (
    <div className="my-8">
      <div className="">
        <div className="flex flex-row flex-wrap gap-2 justify-center xl:justify-between">
          {categorySection.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-md flex justify-center flex-col items-center"
            >
              <ZoomInSlideUp>
                <Link href={`/category/${category.slug}`}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="mx-auto 3xl:w-[100%] hover:scale-110 transition-all duration-300"
                  />
                  <h2 className="text-xs lg:text-sm 3xl:text-md font-semibold text-center mt-2">
                    {category.name}
                  </h2>
                </Link>
              </ZoomInSlideUp>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
