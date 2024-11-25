"use client";
import React from "react";
import Image,{StaticImageData} from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";

// Static Images
import dermatology from "../../../public/speciality/dermatology.png";
import surgery from "../../../public/speciality/surgery.png";
import periodtics from "../../../public/speciality/periodtics.png";
import neurology from "../../../public/speciality/neurology.png";
import off10 from "../../../public/speciality/10off.png";
import medicaldevices from "../../../public/speciality/medicaldevices.png";
import scrubstops from "../../../public/speciality/scrubstops.png";
import usmile from "../../../public/speciality/usmile.png";

interface ExploreSpecialistsProps {
  name: string;
  imageUrl: StaticImageData;
};

export const HomeExploreSpecialists = () => {
  const exploreSpecialists: ExploreSpecialistsProps[] = [
    {
      name: "Dermatology",
      imageUrl: dermatology,
    },
    {
      name: "Surgery",
      imageUrl: surgery,
    },
    {
      name: "Pediatrics",
      imageUrl: periodtics,
    },
    {
      name: "Neurology",
      imageUrl: neurology,
    },
    {
      name: "10% Off",
      imageUrl: off10,
    },
    {
      name: "Medical Devices",
      imageUrl: medicaldevices,
    },
    {
      name: "Scrubs and Tops",
      imageUrl: scrubstops,
    },
    {
      name: "USMILE Step 1",
      imageUrl: usmile,
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
              className="bg-white rounded-md w-[47%] md:w-[23%] flex flex-col items-center"
            >
              <AnimateOnScroll animationType="zoom-in">
                <Image
                  src={specialist.imageUrl}
                  alt={specialist.name}
                  className="card-hover 3xl:w-[100%] object-cover"
                  width={300}
                  height={300}
                />
              </AnimateOnScroll>
              <h2 className="text-sm 3xl:text-lg font-semibold text-center mt-2">
                {specialist.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
