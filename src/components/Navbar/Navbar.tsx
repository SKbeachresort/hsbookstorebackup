"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import BackDropLoader from "@/elements/BackdropLoader";
import { CategoryList } from "../../data/Category";
import { AiFillCloseSquare } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export const Navbar = () => {
  const { totalItems } = useCart();

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
    <div className="">
      {isLoading && <BackDropLoader open={isLoading} />}
      {/* Header Section */}
      <div>
        <div className="bg-blue-100 py-1">
          <p className="text-secondary text-center text-sm xl:text-lg font-medium">
            Get 10% discount on your first order
          </p>
        </div>

        {/* Main Nav Section */}
        <div className="py-5 w-full max-w-[1920px] mx-auto px-[2vh] shadow-md md:shadow-none mb-1 md:mb-0 flex flex-row gap-x-3 md:gap-x-6 justify-between items-center">
          <div className="flex flex-row items-center gap-x-1">
            <div className="md:hidden rounded-sm">
              <GiHamburgerMenu
                onClick={handleNavbarOpen}
                className="text-[3.5vh] text-primary cursor-pointer"
              />
            </div>
            <Link href="/">
              <Image
                src="/logo.png"
                width={200}
                height={40}
                priority
                alt="logo"
                className="hidden md:block"
              />
            </Link>

            <Link href="/">
              <Image
                src="/HSlogo.png"
                width={30}
                height={30}
                priority
                alt="logo"
                className="md:hidden w-[4.5vh] my-auto"
              />
            </Link>
          </div>

          {/* Search Section Bar */}
          <div onClick={handleSearchSubmit} className="relative flex-1 mx-2">
            <input
              type="text"
              placeholder="Search by keyword, title, author or IBSN"
              className="w-full outline-none px-4 py-2 border-2 border-textgray rounded-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-secondary absolute inset-y-0 right-0 flex items-center justify-center px-4 rounded-r-full"
            >
              <RiSearchLine
                className="text-xl 3xl:text-lg cursor-pointer hover:scale-110 transition-all duration-300"
                color="#fff"
              />
            </button>
          </div>

          {/* Cart, Account, Location Section */}
          <div className="flex flex-row justify-center items-center gap-x-0 md:gap-x-2 lg:gap-x-4">
            {/* Location */}
            <div className="flex flex-row justify-center items-center gap-x-1">
              <HiOutlineMapPin className="hidden md:block text-md text-textgray text-2xl" />
              <div className="hidden lg:block">
                <p className="text-xs font-medium text-textgray">
                  Delivery & Site preference
                </p>
                <div className="flex text-textgray flex-row text-sm gap-x-2">
                  <p className="text-md font-semibold">KW</p>
                  <p className="text-md font-semibold">KWD</p>
                  <p className="text-md font-semibold">EN</p>
                </div>
              </div>
            </div>

            {/* Auth Login */}
            <Link href="/auth/login">
              <div className="flex flex-row justify-center items-center gap-x-[1vh]">
                <FaRegUser className="hidden md:block text-textgray text-2xl" />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-textgray">
                    Hello, Sign In
                  </p>
                  <p className="text-sm font-semibold text-textgray">
                    Accounts & Lists
                  </p>
                </div>
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative">
                <div className="bg-success w-6 h-6 absolute -top-3 -right-2 flex flex-col justify-center items-center p-1 rounded-full">
                  <p className="text-sm font-bold text-white">{totalItems}</p>
                </div>
                <AiOutlineShoppingCart className="text-textgray text-3xl" />
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-primary hidden  md:flex justify-start p-[1vh]">
          <div className="w-full max-w-[1920px] mx-auto">
            <div className="px-4 flex flex-row justify-start items-center space-x-4">
              <RxHamburgerMenu size={24} color="#fff" />
              {CategoryList.map((category, index) => {
                const slug = category.category.toLowerCase().replace(/ /g, "-");
                return (
                  <Link href={`/category/${slug}`} key={index}>
                    <p className="text-sm lg:text-md font-medium text-white">
                      {category.category}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
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
                  const slug = category.category
                    .toLowerCase()
                    .replace(/ /g, "-");
                  return (
                    <li
                      key={index}
                      className="bg-secondary my-[2vh] px-[2vh] py-[1vh]"
                    >
                      <Link href={`/category/${slug}`}>
                        <p className="text-[2.2vh] font-medium text-white">
                          {category.category}
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
