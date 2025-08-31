"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-green-600">HaloDesa</span>
          <span className="text-sm text-gray-600 font-light">
            Desa Maju Sejahtera
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <a
              href="/"
              className="text-black transition-all duration-200 hover:text-green-600 hover:scale-110"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/laporan"
              className="text-black transition-all duration-200 hover:text-green-600 hover:scale-110"
            >
              Laporan
            </a>
          </li>
          <li>
            <a
              href="/pengumuman"
              className="text-black transition-all duration-200 hover:text-green-600 hover:scale-110"
            >
              Pengumuman
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-black transition-all duration-200 hover:text-green-600 hover:scale-110"
            >
              Tentang
            </a>
          </li>
        </ul>

        {/* Burger Mobile */}
        <button
          className="md:hidden p-2 hover:bg-gray-200 transition rounded-none"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="w-6 h-6 text-black-800" />
          ) : (
            <Menu className="w-6 h-6 text-black-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 font-medium bg-white backdrop-blur-md animate-slideDown rounded-none text-gray-700">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="hover:text-green-600"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="hover:text-green-600"
          >
            Tentang
          </a>
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="hover:text-green-600"
          >
            Fitur
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="hover:text-green-600"
          >
            Kontak
          </a>
        </div>
      )}
    </nav>
  );
}
