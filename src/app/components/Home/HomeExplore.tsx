"use client";
import React from "react";
import Image from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";

interface ExploreProps {
  name: string;
  imageUrl: string;
}

export const HomeExplore = () => {
  const exploreSection: ExploreProps[] = [
    {
      name: "Blood Pressure Monitors",
      imageUrl: "/medicaldress.png",
    },
    {
      name: "Stethoscopes",
      imageUrl: "/sthethoscope.png",
    },
    {
      name: "Suturing Kits",
      imageUrl: "/suits.png",
    },
    {
      name: "Hydration Bottles",
      imageUrl: "/bottomkit.png",
    },
  ];

  return (
    <div>
      <div className="">
        <div className="flex flex-row flex-wrap gap-y-2 justify-between ">
          {exploreSection.map((explore, index) => (
            <div
              key={index}
              className="bg-white rounded-md w-[47%] md:w-[23%] flex flex-col items-center"
            >
              <AnimateOnScroll animationType="zoom-in-up">
                <Image
                  src={explore.imageUrl}
                  alt={explore.name}
                  width={200}
                  height={400}
                  className="3xl:w-[300px]"
                />
              </AnimateOnScroll>
              <h2 className="text-sm xl:text-md font-medium text-center mt-2">
                {explore.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
