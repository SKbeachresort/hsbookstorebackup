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

export const Footer = () => {
  return (
    <footer className="bg-primary text-white p-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-semibold text-[2.4vh] text-secondary mb-2">
            About Us
          </h3>
          <ul className="space-y-1 text-[2vh]">
            <li>About us</li>
            <li>Blog</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-[2.4vh] text-secondary mb-2">
            Help
          </h3>
          <ul className="space-y-1 text-[2vh]">
            <li>Account</li>
            <li>My Order</li>
            <li>WishList</li>
            <li>Returns</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-[2.4vh] text-secondary mb-2">
            Legal
          </h3>
          <ul className=" text-[2vh]">
            <Link href="/legal/terms-and-conditions">
              <li className="space-y-1">Terms and Conditions</li>
            </Link>
            <Link href="/legal/privacy-policy">
              <li className="space-y-1">Privacy Policy</li>
            </Link>
            <Link href="/legal/disclaimer">
              <li className="space-y-1">Disclaimer</li>
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-[2.4vh] text-secondary mb-2">
            Contact
          </h3>
          <ul className="space-y-1 text-[2vh]">
            <li className="flex items-center">
              <FaWhatsapp size={20} className="mr-2" /> +965 123 555 67
            </li>
            <li className="flex items-center">
              <IoMdMail size={20} className="mr-2" /> info@hsbookstore.com
            </li>
          </ul>
          <h3 className="font-semibold text-[2.4vh] text-secondary mt-4 mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-3 ">
            <FaFacebookF className="cursor-pointer icon-style" />
            <FaTwitter className="cursor-pointer icon-style" />
            <FaInstagram className="cursor-pointer icon-style" />
            <FaPinterest className="cursor-pointer icon-style" />
            <FaThreads className="cursor-pointer icon-style" />
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm">
        HSbookstore.com Copyright © 2024 All rights reserved
      </div>
    </footer>
  );
};
