"use client";
import React from "react";
import Image,{StaticImageData} from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";

// Staic Images
import medicaldress from "../../../public/medicaldress.png";
import sthethoscope from "../../../public/sthethoscope.png";
import suits from "../../../public/suits.png";
import bottomkit from "../../../public/bottomkit.png";

interface ExploreProps {
  name: string;
  imageUrl: StaticImageData;
}

export const HomeExplore = () => {
  const exploreSection: ExploreProps[] = [
    {
      name: "Blood Pressure Monitors",
      imageUrl: medicaldress,
    },
    {
      name: "Stethoscopes",
      imageUrl: sthethoscope,
    },
    {
      name: "Suturing Kits",
      imageUrl: suits,
    },
    {
      name: "Hydration Bottles",
      imageUrl: bottomkit,
    },
  ];

  return (
    <div>
      <div className="my-4">
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
                  width={300}
                  height={400}
                  className="w-full hover:scale-110 transition-transform duration-500"
                />
              </AnimateOnScroll>
              <h2 className="text-sm xl:text-md font-semibold text-center mt-2">
                {explore.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
