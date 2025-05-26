"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

import ProfilePopover from "../components/ProfilePopover "; 

const Navbar = () => {

  const { router } = useAppContext();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Link href="https://cwpteam.ntplstaging.com/Ragu/nextjs/rg/">
      <Image
        className="cursor-pointer w-8 md:w-15"
        src={assets.logo}
        alt="logo"
      />
        </Link>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="https://cwpteam.ntplstaging.com/Ragu/nextjs/rg/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/cart" className="hover:text-gray-900 transition">
          Cart
        </Link>
        {/* <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link> */}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        {/* <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button> */}
        <ProfilePopover />
      </ul>
    </nav>
  );
};

export default Navbar;
