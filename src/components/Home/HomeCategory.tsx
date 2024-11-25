"use client";
import React from "react";
import Link from "next/link";
import Image,{StaticImageData} from "next/image";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";


// Static Images
import medicalbooks from "../../../public/category/medicalbooks.png";
import medicaldevices from "../../../public/category/medicaldevices.png";
import sthethoscope from "../../../public/category/sthethoscope.png";
import scrubs from "../../../public/category/scrubs.png";
import clipboards from "../../../public/category/clipboard.png";

interface CategoryProps {
  id: number;
  name: string;
  imageUrl: StaticImageData;
  slug: string;
};

export const HomeCategory = () => {
  const categorySection: CategoryProps[] = [
    {
      id: 1,
      name: "Shop for Books",
      imageUrl: medicalbooks,
      slug: "books",
    },
    {
      id: 2,
      name: "Shop for Medical Devices",
      imageUrl: medicaldevices,
      slug: "medical-devices",
    },
    {
      id: 3,
      name: "Shop for Stethoscopes",
      imageUrl: sthethoscope,
      slug: "sthethoscopes",
    },
    {
      id: 4,
      name: "Shop for Scrubs",
      imageUrl: scrubs,
      slug: "scrubs",
    },
    {
      id: 5,
      name: "Shop for Clipboards",
      imageUrl: clipboards,
      slug: "clipboards",
    },
  ];

  return (
    <div className="my-10">
      <div className="">
        <div className="flex flex-row flex-wrap gap-2 md:gap-0 justify-center md:justify-between">
          {categorySection.map((category, index) => (
            <div
              key={index}
              className="bg-white md:w-[18%] rounded-md flex justify-center flex-col items-center"
            >
              <ZoomInSlideUp>
                <Link href={`/category/${category.slug}`}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="md:w-[90%] mx-auto 3xl:w-full hover:scale-110 transition-all duration-300"
                  />
                  <h2 className="text-[0.6rem] md:text-xs 3xl:text-md font-semibold text-center mt-2">
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
