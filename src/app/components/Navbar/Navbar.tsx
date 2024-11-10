"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import BackDropLoader from "@/app/elements/BackdropLoader";
import { CategoryList } from "./Category";
import { AiFillCloseSquare } from "react-icons/ai";

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef(null);

  const handleNavbarOpen = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search Clicked", searchQuery);
      router.push(`/results/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      {isLoading && <BackDropLoader open={isLoading} />}
      {/* Header Section */}

      <div className="bg-blue-100 py-[0.5vh]">
        <p className="text-secondary text-center text-[1.8vh] md:text-[2.2vh] font-medium">
          Get 10% discount on your first order
        </p>
      </div>

      {/* Main Nav Section */}
      <div className="py-[2.5vh] px-[2vh] shadow-md flex flex-row justify-between">
        <Link href="/">
          <img src="/logo.png" className="w-[20vh] md:w-[25vh] my-auto" />
        </Link>

        {/* Search Section Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="md:flex md:flex-row overflow-hidden hidden justify-between items-center md:w-[30vw] lg:w-[45vw]"
        >
          <input
            type="text"
            placeholder="Search by keyword, title, author or IBSN"
            className="w-full rounded-l-full border-2 border-r-0 border-textgray text-[2.2vh] outline-none px-[2vh] p-[1vh]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-secondary rounded-r-full h-full px-[2vh] flex flex-col justify-center items-center"
          >
            <RiSearchLine
              className="text-[3vh] cursor-pointer hover:scale-110 transition-all duration-300"
              color="#fff"
            />
          </button>
        </form>

        {/* Cart, Account, Location Section */}
        <div className="flex flex-row justify-center items-center gap-x-[1vh] md:gap-x-[3vh]">
          {/* Location */}
          <div className="flex flex-row justify-center items-center gap-x-[0.5vh]">
            <HiOutlineMapPin className="text-[3.5vh] md:text-[4vh]" />
            <div className="hidden md:block">
              <p className="md:text-[1.3vh] lg:text-[1.6vh] font-medium text-textgray">
                Delivery & Site preference
              </p>
              <div className="flex flex-row md:text-[1.3vh] lg:text-[2vh] md:gap-x-[1vh] lg:gap-x-[2vh]">
                <p className="text-[2vh] font-semibold">KW</p>
                <p className="text-[2vh] font-semibold">KWB</p>
                <p className="text-[2vh] font-semibold">EN</p>
              </div>
            </div>
          </div>

          {/* Auth Login */}
          <Link href="/auth/login">
            <div className="flex flex-row justify-center items-center gap-x-[1vh]">
              <FaRegUser className="text-[3vh] md:text-[2.8vh] lg:text-[3.5vh]" />
              <div className="hidden md:block">
                <p className="text-[1.4vh] lg:text-[1.6vh] font-medium text-textgray">
                  Hello, Sign In
                </p>
                <p className="text-[1.5vh] lg:text-[1.8vh] font-semibold text-textgray">
                  Accounts & Lists
                </p>
              </div>
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <div className="relative">
              <div className="bg-success absolute -top-[30%] -right-[15%] w-[3vh] h-[3vh] flex flex-col justify-center items-center p-[1vh] rounded-full">
                <p className="text-[1.5vh] font-bold text-white">3</p>
              </div>
              <AiOutlineShoppingCart className="text-[4vh]" />
            </div>
          </Link>

          <div className="md:hidden rounded-sm ml-[1vh]">
            <RxHamburgerMenu
              onClick={handleNavbarOpen}
              className="text-[4vh] text-primary cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-primary hidden  md:flex flex-row justify-between items-center gap-x-[2vh] p-[1vh]">
        <div className="flex flex-row justify-center items-center gap-x-[2vh]">
          <RxHamburgerMenu size={24} color="#fff" />
          {CategoryList.map((category, index) => {
            const slug = category.toLowerCase().replace(/ /g, "-");
            return (
              <Link href={`/category/${slug}`} key={index}>
                <p className="text-[2vh] font-medium text-white">{category}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {navOpen && (
        <div className="fixed bg-black z-50 overflow-y-auto overflow-x-hidden inset-0 w-full h-full backdrop-blur-sm bg-opacity-50 flex justify-end items-end transition-opacity duration-300 ease-in-out">
          <div
            className={`relative bg-white w-[90vw] h-full overflow-y-scroll px-[2.5vh] md:px-[5vh] animate-fadeRight transform ${
              navOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-500 ease-in-out`}
            onClick={(e) => e.stopPropagation()}
          >
            <p onClick={handleNavbarOpen}>
              <AiFillCloseSquare className="cursor-pointer text-[5vh] my-[2vh] text-primary" />
            </p>

            <div className="my-[4vh]">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-row overflow-hidden justify-between items-center w-[100%] mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search by keyword, title, author or IBSN"
                  className="w-full rounded-l-full border-2 border-r-0 border-textgray text-[2.2vh] outline-none px-[2vh] p-[1vh]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-secondary rounded-r-full h-[6vh] px-[2vh] flex flex-col justify-center items-center"
                >
                  <RiSearchLine
                    className="text-[3vh] cursor-pointer hover:scale-110 transition-all duration-300"
                    color="#fff"
                  />
                </button>
              </form>
            </div>

            <div>
              <h1 className="text-[2.6vh] text-primary font-semibold">
                Category
              </h1>
              <ul>
                {CategoryList.map((category, index) => {
                  const slug = category.toLowerCase().replace(/ /g, "-");
                  return (
                    <li
                      key={index}
                      className="bg-secondary my-[2vh] px-[2vh] py-[1vh]"
                    >
                      <Link href={`/category/${slug}`}>
                        <p className="text-[2.2vh] font-medium text-white">
                          {category}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};