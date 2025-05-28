"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import ProfilePopover from "../components/ProfilePopover ";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { router } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative">
      <Link href="/">
        <Image className="cursor-pointer w-8 md:w-12" src={assets.logo} alt="logo" />
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/cart" className="hover:text-gray-900 transition">Cart</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Account */}
      <div className="hidden md:block">
        <ProfilePopover />
      </div>

      {/* Mobile Slide-in Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-4 md:hidden z-30">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/all-products" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          <ProfilePopover isMobile={true} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
