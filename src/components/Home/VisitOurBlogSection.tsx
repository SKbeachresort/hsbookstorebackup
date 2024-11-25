"use client";
import React from "react";
import Image,{StaticImageData} from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

// Static Images
import nephrology from "../../../public/nephrology.png";
import orofacial from "../../../public/orofacial.png";
import visitblog from "../../../public/visitblog.png";
import oralsoft from "../../../public/oralsoft.png";
import hermology from "../../../public/hermology.png";

import servicebanner from "../../../public/servicebanner.png";
import mobileservicebanner from "../../../public/mobileservicebanner.png";

interface VisitBlogProps {
  name: string;
  imageUrl: StaticImageData;
};

export const VisitOurBlogSection = () => {
  const visitBlogSection: VisitBlogProps[] = [
    {
      name: "Nephrology: What it is",
      imageUrl: nephrology,
    },
    {
      name: "Orofacial Pain and Headache",
      imageUrl: orofacial,
    },
    {
      name:"",
      imageUrl: visitblog,
    },
    {
      name: "Oral soft tissue diseases",
      imageUrl: oralsoft,
    },
    {
      name: "What is Hematology?",
      imageUrl: hermology,
    },
  ];

  return (
    <div className="mb-8">
      <div className="my-4">
        <div className="flex flex-row flex-wrap gap-y-2 justify-between">
          {visitBlogSection.map((visitBlog, index) => (
            <div
              key={index}
              className="bg-white w-[47%] md:w-[18%] rounded-md flex flex-col items-center"
            >
              <AnimateOnScroll animationType="zoom-in-up">
                <Image
                  src={visitBlog.imageUrl}
                  alt={visitBlog.name}
                  width={150}
                  height={150}
                  className="w-full 3xl:w-[300px] hover:scale-110 transition-all duration-300 ease-in-out"
                />
              </AnimateOnScroll>
              <h2 className="text-xs xl:text-md font-semibold text-center mt-2">
                {visitBlog.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <ZoomInSlideUp>
        <Image
          src={servicebanner}
          width={1920}
          height={80}
          alt="service-banner"
          className="hidden md:block"
        />
      </ZoomInSlideUp>
      <Image
        src={mobileservicebanner}
        width={1920}
        height={80}
        alt="service-banner"
        className="md:hidden"
      />
    </div>
  );
};
