"use client";
import React from "react";
import Image from "next/image";

export const HomeDermatologySection = () => {
  return (
    <div className="my-5">
      <Image
        src="/dermatologybook.png"
        width={1920}
        height={1080}
        alt="dermartology-sectionImg"
        className="w-full mx-auto hidden md:block"
      />

      <div className="md:hidden bg-[#E3F2F5] flex flex-col justify-center items-center my-[2vh]">
        <h1 className="text-lg font-medium my-4 text-textgray">
          DERMATOLOGY BOOK
        </h1>
        <h1 className="w-[90%] mx-auto text-lg font-medium text-center">
          THE LEADING REFERENCE FOR UNDERSTANDING, DIAGNOSING, AND TREATING THE
          FULL SPECTRUM OF SKIN DISEASE
        </h1>
        <button className="text-white px-4 py-1 my-4 rounded-full font-semibold text-sm bg-secondary">
          SHOP NOW
        </button>

        <Image
          src="/dermatologybookMob.png"
          alt="hero-sectionImg"
          width={400}
          height={400}
          className="w-[90%] mx-auto"
        />
      </div>
    </div>
  );
};