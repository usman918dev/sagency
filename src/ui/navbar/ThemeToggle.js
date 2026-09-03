"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isLight = theme === "light";

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-[var(--background-alt)] border border-[var(--border)] shrink-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className={`group relative inline-flex items-center w-14 h-7 rounded-full p-1 transition-all duration-300 ease-in-out shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9D26FF] cursor-pointer border ${
        isLight
          ? "bg-purple-50/80 border-purple-200 shadow-inner"
          : "bg-[#0c0f1d] border-purple-500/30 shadow-inner"
      }`}
    >
      {/* Background Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun
          size={13}
          className={`transition-all duration-300 ${
            isLight ? "text-amber-500 opacity-100 scale-100" : "text-slate-500 opacity-40 scale-90"
          }`}
        />
        <Moon
          size={13}
          className={`transition-all duration-300 ${
            !isLight ? "text-purple-400 opacity-100 scale-100" : "text-slate-400 opacity-40 scale-90"
          }`}
        />
      </div>

      {/* Sliding Glowing Gradient Thumb */}
      <span
        className={`relative z-10 w-5 h-5 rounded-full bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] shadow-[0_0_12px_rgba(157,38,255,0.7)] ${
          isLight ? "translate-x-0" : "translate-x-7"
        } transition-transform duration-300 ease-out flex items-center justify-center group-hover:scale-110`}
      >
        {isLight ? (
          <Sun size={11} className="text-white fill-white" />
        ) : (
          <Moon size={11} className="text-white fill-white" />
        )}
      </span>
    </button>
  );
}
