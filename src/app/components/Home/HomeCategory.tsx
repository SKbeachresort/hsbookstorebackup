import React from "react";
import Link from "next/link";

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
    <div className="my-[3vh]">
      <div className="w-[90%] md:w-[75%] mx-auto mt-[5vh]">
        <div className="flex flex-row flex-wrap gap-y-[2vh] justify-between ">
          {categorySection.map((category, index) => (
            <div
              key={index}
              className=" bg-white rounded-md w-[47%] flex flex-col items-center md:w-[25vh]"
            >
              <Link href={`/category/${category.slug}`}>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="card-hover w-full md:w-[24vh] h-[24vh] object-cover"
                />
                <h2 className="text-[1.8vh] font-medium text-center mt-2">
                  {category.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
