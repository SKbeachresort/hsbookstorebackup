"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import BackDropLoader from "@/app/elements/BackdropLoader";
import { CategoryList } from "../../data/Category";
import { AiFillCloseSquare } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCart } from "@/context/CartContext";
import Image, { StaticImageData } from "next/image";
import PopOverDropDown from "@/app/elements/PopOverDropDown";
import { useRegions } from "@/context/RegionProviders";
import { setCookie } from "cookies-next";
import SearchProduct from "./SearchProduct";
import { useIsAuthenticated } from "@/hooks/userIsAuthenticated";

import HSlogo from "../../../public/HSlogo.png";
import logo from "../../../public/logo.png";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { CategorySheet } from "./CategorySheet";
import { CategoryNavbar } from "./CategoryNavbar";
import { useRegionUrl } from "@/hooks/useRegionUrl";
import { getUserDetails } from "@/hooks/getUser";
import { getAccessToken } from "@/utils/accessToken";
import { useAuth } from "@/context/AuthContext";


export const Navbar = () => {
  const { channel, locale } = useParams();

  const router = useRouter();

  const {isAuthenticated} = useAuth();

  const { user, loading, error } = getUserDetails();

  useEffect(() => {
    if(isAuthenticated && user){
      router.push(getRegionUrl(`me/${user?.id}`));
    }
  },[isAuthenticated, user, router]);

  const { totalItems } = useCart();
  const { getRegionUrl } = useRegionUrl();

  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentLocale, currentChannel, setCurrentChannel } = useRegions();

  // Category Sheet
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleSheet = () => {
    setSheetOpen((prev) => !prev);
  };

  const pathname = usePathname();
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

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newchannel = e.target.value;
    if (newchannel !== currentChannel.slug) {
      setCookie("channel", newchannel);
      setCurrentChannel(newchannel);
      router.push(pathname.replace(currentChannel.slug, newchannel));
    }
  };

  const handleAuthRedirect = () => {
    if (isAuthenticated) {
      router.push(getRegionUrl(`me/${user?.id}`));
    } else {
      router.push(getRegionUrl(`auth/login`));
    }
  };

  return (
    <>
      {isLoading && <BackDropLoader open={isLoading} />}
      {/* Header Section */}
      <div className="">
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
            <Link href={getRegionUrl("/")}>
              <Image
                src={logo}
                width={200}
                height={40}
                priority
                alt="logo"
                className="hidden md:block"
              />
            </Link>

            <Link href={getRegionUrl("/")}>
              <Image
                src={HSlogo}
                width={30}
                height={30}
                priority
                alt="logo"
                className="md:hidden w-[4.5vh] my-auto"
              />
            </Link>
          </div>

          {/* Search Section Bar */}
          <div className="relative flex-1">
            <SearchProduct
              channel={channel as string}
              locale={locale as string}
            />
          </div>

          {/* Cart, Account, Location Section */}
          <div className="flex flex-row justify-center items-center gap-x-0 md:gap-x-2 lg:gap-x-4">
            {/* Location */}
            <PopOverDropDown
              trigger={
                <div className="flex flex-row justify-center items-center gap-x-1">
                  <HiOutlineMapPin className="hidden md:block text-md text-textgray text-2xl" />
                  <div className="hidden lg:block">
                    <p className="text-xs font-medium text-textgray">
                      Delivery & Site preference
                    </p>
                    <div className="flex text-textgray flex-row text-sm gap-x-2 items-center">
                      <p className="text-md font-semibold">
                        {currentChannel.name === "United States Dollar"
                          ? "US"
                          : "KW"}
                      </p>
                      <p className="text-md font-semibold">
                        {currentChannel.currencyCode}
                      </p>
                      <p className="text-md font-semibold">EN </p>
                      <span className="-ml-1">
                        <FaCaretDown className="text-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="flex flex-col gap-y-2 p-2 ">
                <select
                  value={currentChannel.slug}
                  onChange={handleRegionChange}
                  className="border-[1px] cursor-pointer border-borderColor outline-none p-1"
                >
                  <option value="default-channel" className="cursor-pointer">
                    Kuwait - KWD
                  </option>
                  <option value="channel-usd" className="cursor-pointer">
                    USA - USD
                  </option>
                </select>
              </div>
            </PopOverDropDown>

            {/* Auth Login */}
            {isAuthenticated && user ? (
              <Link href={getRegionUrl(`me/${user?.id}`)} passHref>
                <div className="flex flex-row justify-center items-center gap-x-[1vh]">
                  <FaRegUser className="hidden md:block text-textgray text-2xl" />
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-textgray">
                      {loading ? `loading` : `${user?.firstName}`}{" "}
                      {loading ? `loading` : `${user?.lastName}`}
                    </p>
                    <p className="text-xs font-semibold text-textgray">
                      {loading ? `loading` : `${user?.email}`}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href={getRegionUrl(`auth/login`)}>
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
            )}

            {/* Cart */}
            <Link href={getRegionUrl(`cart`)}>
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
              <SheetTrigger asChild>
                <RxHamburgerMenu
                  className="cursor-pointer"
                  size={24}
                  color="#fff"
                />
              </SheetTrigger>

              <CategoryNavbar />
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Content */}
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Explore Categories</SheetTitle>
        </SheetHeader>
        <CategorySheet />
      </SheetContent>

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
              <form className="flex flex-row overflow-hidden justify-between items-center w-[100%] mx-auto">
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
    </>
  );
};