// Navbar.tsx
"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import ProfilePopover from "../components/ProfilePopover ";
  const siteUrl = process.env.NEXT_PUBLIC_WC_SITE_URL;

const Navbar = () => {
  const { router } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
      <Link href="{siteUrl}">
        <Image
          className="cursor-pointer w-8 md:w-15"
          src={assets.logo}
          alt="logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link href="{siteUrl}" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/cart" className="hover:text-gray-900 transition">Cart</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
         {menuOpen ? '✖' : '☰'}
        </button>
        <ProfilePopover />
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:hidden z-10">
          <div className="flex flex-col items-start p-4 gap-3">
            <Link href="{siteUrl}" className="hover:text-gray-900 transition">Home</Link>
            <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
            <Link href="/cart" className="hover:text-gray-900 transition">Cart</Link>
          </div>
        </div>
      )}

      {/* Desktop Profile */}
      <div className="hidden md:flex items-center">
        <ProfilePopover />
      </div>
    </nav>
  );
};

export default Navbar;
