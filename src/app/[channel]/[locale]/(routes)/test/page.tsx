"use client";
import React from "react";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TestRoute = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {/* Text Size */}
      <h1 className="text-xs">Hello</h1>
      <h1 className="text-sm">Hello</h1>
      <h1 className="text-md">Hello</h1>
      <h1 className="text-lg">Hello</h1>
      <h1 className="text-xl">Hello</h1>
      <h1 className="text-2xl bg-red-500 text-center text-white">Hello</h1>

      <button className="text-md my-8 px-4 py-3 font-bold bg-red-400">
        Click here
      </button>

      <div>
        <Image
          src="/suits.png"
          width={200}
          height={200}
          className="w-full md:w-[50%] lg:w-[40%] xl:w-[25%]"
          alt="suit image"
        />
      </div>

      <div className="flex flex-col md:flex-row "></div>

    </div>
  );
};

export default TestRoute;
