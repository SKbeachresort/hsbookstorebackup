// app/components/SubCategorySidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { CategorySheet } from "../Navbar/CategorySheet";

export const SubCategorySidebar = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="hidden md:block">
      <div
        className={`${
          open ? "w-80" : "w-12"
        } relative bg-white p-[1vh] lg:p-3 text-wrap h-full border-r-2 border-blue-50 flex flex-col pt-3  duration-300`}
      >
        <IoIosArrowDropleftCircle
          className={`absolute z-30 text-lg md:text-2xl text-primary cursor-pointer w-[3.5vh] lg:w-[4vh] -right-[2vh] top-5 border-1 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        {open && <CategorySheet />}
      </div>
    </div>
  );
};
