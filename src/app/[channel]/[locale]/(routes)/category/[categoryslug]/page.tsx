"use server"
import React from "react";
import { FeaturedCategories } from "@/components/CategoryPage/PageComponents/FeaturedCategories";
import { BestSellers } from "@/components/CategoryPage/PageComponents/BestSellers";
import { RecentlyAdded } from "@/components/CategoryPage/PageComponents/RecentlyAdded";
import Image from "next/image";
import slider1 from "../../../../../../../public/slider1.png";

interface CategoryPageProps {
  params: { categoryslug: string; channel: string };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {

  const { channel, categoryslug } = await params;

  return (
    <div className="w-[90%] mx-auto md:mx-10 py-10">
      <Image
        src={slider1}
        width={1000}
        height={10}
        alt="slider"
        className="w-full md:w-[80%] mx-auto"
      />
      <BestSellers
        channel={channel}
        slug={categoryslug}
        after=""
      />
      <RecentlyAdded
        channel={channel}
        slug={categoryslug}
        after=""
      />
    </div>
  );
};

export default CategoryPage;