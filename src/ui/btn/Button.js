"use client";

import Link from "next/link";

export default function Button({ text, href }) {
  return (
    <Link
      className="group relative inline-flex items-center justify-center overflow-hidden border border-[#9D26FF]/40 hover:border-[#9D26FF] px-8 py-3.5 rounded-full transition-all duration-300 shadow-md bg-[var(--background-alt)] hover:bg-[#9D26FF] text-[var(--foreground-heading)] hover:text-white font-semibold text-sm cursor-pointer"
      href={href || "#"}
    >
      <span className="relative text-sm font-semibold transition-colors duration-300">
        {text}
      </span>
    </Link>
  );
}

export function SecondButton({ text, href }) {
  return (
    <Link
      className="group relative inline-flex items-center justify-center overflow-hidden border border-[#9D26FF] px-8 py-3.5 rounded-full transition-all duration-300 shadow-md bg-[#9D26FF] hover:bg-[#8500ED] text-white font-extrabold text-sm cursor-pointer"
      href={href || "#"}
    >
      <span className="relative text-sm font-extrabold text-white transition-colors duration-300">
        {text}
      </span>
    </Link>
  );
}