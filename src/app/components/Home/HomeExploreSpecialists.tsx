"use client";
import React from "react";
import Image from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";

interface ExploreSpecialistsProps {
  name: string;
  imageUrl: string;
}

export const HomeExploreSpecialists = () => {
  const exploreSpecialists: ExploreSpecialistsProps[] = [
    {
      name: "Dermatology",
      imageUrl: "/speciality/dermatology.png",
    },
    {
      name: "Surgery",
      imageUrl: "/speciality/surgery.png",
    },
    {
      name: "Pediatrics",
      imageUrl: "/speciality/periodtics.png",
    },
    {
      name: "Neurology",
      imageUrl: "/speciality/neurology.png",
    },
    {
      name: "10% OFF",
      imageUrl: "/speciality/10off.png",
    },
    {
      name: "Medical Devices",
      imageUrl: "/speciality/medicaldevices.png",
    },
    {
      name: "Scrubs and Tops",
      imageUrl: "/speciality/scrubstops.png",
    },
    {
      name: "USMILE Step 1",
      imageUrl: "/speciality/usmile.png",
    },
  ];

  return (
    <div className="my-5">
      <h1 className="text-md xl:text-lg 3xl:text-xl 3xl:my-10 text-center font-semibold">
        Explore more Specialists
      </h1>

      <div className="my-4">
        <div className="flex flex-row flex-wrap gap-y-[2vh] justify-between ">
          {exploreSpecialists.map((specialist, index) => (
            <div
              key={index}
              className="bg-white rounded-md w-[47%] flex flex-col items-center md:w-[23%]"
            >
              <AnimateOnScroll animationType="fadde-up">
                <Image
                  src={specialist.imageUrl}
                  alt={specialist.name}
                  className="card-hover 3xl:w-[70%] object-cover"
                  width={200}
                  height={200}
                />
              </AnimateOnScroll>
              <h2 className="text-sm 3xl:text-lg font-medium text-center mt-2">
                {specialist.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
