"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FeaturedCategories } from "@/components/CategoryPage/PageComponents/FeaturedCategories";
import Image from "next/image";
import slider1 from "../../../../../../../public/slider1.png";

const CategoryPage =  () => {

  const { locale, channel, categoryslug } = useParams();

  return (
    <div className="w-[90%] mx-auto md:mx-10 py-10">
      <Image src={slider1} width={1000} height={10} alt="slider" className="w-full md:w-[80%] mx-auto"/>
      <FeaturedCategories categoryslug={categoryslug as string}/>
    </div>
  );
};

export default CategoryPage;