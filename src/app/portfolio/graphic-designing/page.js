"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { graphicDesignCategories } from "@/lib/graphicDesignData";

export default function GraphicDesignCategoriesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden text-white flex flex-col justify-between">
      {/* Background Radial Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#9D26FF]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="g-px relative z-10 pt-6 pb-20 max-w-7xl mx-auto w-full">
        
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Portfolio Directory</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-purple-950/40"
          >
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>DERIXIO GRAPHIC DESIGN SHOWCASE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4"
          >
            Graphic Design <br />
            <span className="text-[#9D26FF]">
              Specialized Categories
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Select a specialized category below to view dedicated client portfolios and visual assets.
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* MINIMALIST 7 CATEGORY CARDS GRID (NO IMAGES, NO DESCRIPTIONS) */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto"
        >
          {graphicDesignCategories.map((category) => (
            <motion.div key={category.id} variants={cardVariants}>
              <Link
                href={`/portfolio/graphic-designing/${category.slug}`}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-950/80 transform hover:-translate-y-2 hover:scale-[1.03] overflow-hidden min-h-[200px]"
              >
                {/* Subtle Ambient Hover Glow Layer inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Category Name */}
                <div className="relative z-10 mb-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#9D26FF] block mb-2 opacity-80">
                    Graphic Service
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-tight tracking-tight">
                    {category.name}
                  </h2>
                </div>

                {/* View Portfolio Button Only */}
                <div className="relative z-10 w-full py-3.5 px-5 rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] group-hover:text-white text-xs font-bold shadow-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#9D26FF] group-hover:to-[#7C3AED] group-hover:border-transparent group-hover:shadow-purple-900/60 flex items-center justify-between">
                  <span>View Portfolio</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#9D26FF] group-hover:text-white"
                  />
                </div>

                {/* Glowing Outer Border Effect */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 group-hover:border-[var(--border)] transition-colors" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Bottom Conversion Banner */}
      <section className="py-14 bg-[var(--background)] border-t border-[var(--border)] text-center relative z-10">
        <div className="px-6 max-w-4xl mx-auto">
          <p className="text-xs font-bold text-[#9D26FF] uppercase tracking-widest mb-2">
            DERIXIO CREATIVE STUDIO
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] mb-6 tracking-tight">
            Ready to Start Your Graphic Design Project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-7 py-3.5 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-bold rounded-xl shadow-xl shadow-purple-950/60 transition-all duration-300 hover:scale-105 text-xs uppercase tracking-wider"
          >
            <span>Request Custom Project Quote</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
