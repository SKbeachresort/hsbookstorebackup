"use client";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

export const Footer = () => {

  const { getRegionUrl } = useRegionUrl();

  return (
    <footer className="bg-primary  text-white p-8">
      <div className="container w-[90%] xl:w-[75%] 3xl:w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-semibold text-md text-secondary mb-2">
            About Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>About us</li>
            <li>Blog</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-md text-secondary mb-2">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Account</li>
            <li>My Order</li>
            <li>WishList</li>
            <li>Returns</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-md text-secondary mb-2">
            Legal
          </h3>
          <ul className=" text-sm">
            <Link href={getRegionUrl(`legal/terms-and-conditions`)}>
              <li className="space-y-2">Terms and Conditions</li>
            </Link>
            <Link href={getRegionUrl(`legal/privacy-policy`)}>
              <li className="space-y-2">Privacy Policy</li>
            </Link>
            <Link href={getRegionUrl(`legal/disclaimer`)}>
              <li className="space-y-2">Disclaimer</li>
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-md text-secondary mb-2">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">  
              <FaWhatsapp size={20} className="mr-2" /> +965 123 555 67
            </li>
            <li className="flex items-center">
              <IoMdMail size={20} className="mr-2" /> info@hsbookstore.com
            </li>
          </ul>
          <h3 className="font-semibold text-md text-secondary mt-4 mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-3 text-md">
            <FaFacebookF className="cursor-pointer icon-style" />
            <FaTwitter className="cursor-pointer icon-style" />
            <FaInstagram className="cursor-pointer icon-style" />
            <FaPinterest className="cursor-pointer icon-style" />
            <FaThreads className="cursor-pointer icon-style" />
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-md">
        HSbookstore.com Copyright © 2024 All rights reserved
      </div>
    </footer>
  );
};