"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { User, Library, Compass, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary group">
          N P X <span className="text-white group-hover:text-primary transition-colors">READER</span>
        </Link>
        <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-400">
          <Link href="/manga" className="hover:text-white transition-colors flex items-center gap-2">
            <Compass className="w-4 h-4" /> Manga
          </Link>
          <Link href="/manhwa" className="hover:text-white transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /> Manhwa
          </Link>
          <Link href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Library className="w-4 h-4" /> Library
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        <SearchBar />
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full glass hover:bg-white/10 transition-colors">
            <User className="w-5 h-5 text-gray-300" />
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 glow shadow-lg shadow-primary/20">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
}
