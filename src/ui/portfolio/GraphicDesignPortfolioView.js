"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { graphicDesignCategories } from "@/lib/graphicDesignData";

export default function GraphicDesignPortfolioView() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden text-white flex flex-col justify-between">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#9D26FF]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="g-px relative z-10 pt-6 pb-20 max-w-7xl mx-auto w-full">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Portfolio Directory</span>
        </Link>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-lg shadow-purple-950/40">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>DERIXIO GRAPHIC DESIGN SHOWCASE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            Graphic Design <br />
            <span className="text-[#9D26FF]">
              Specialized Categories
            </span>
          </h1>

          <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Select a specialized category below to view dedicated client portfolios and visual assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {graphicDesignCategories.map((category) => (
            <div key={category.id}>
              <Link
                href={`/portfolio/graphic-designing/${category.slug}`}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-[var(--card)] backdrop-blur-xl border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden min-h-[200px]"
              >
                <div className="relative z-10 mb-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#9D26FF] block mb-2 opacity-80">
                    Graphic Service
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-tight tracking-tight">
                    {category.name}
                  </h2>
                </div>

                <div className="relative z-10 w-full py-3.5 px-5 rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-heading)] group-hover:text-white text-xs font-bold shadow-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#9D26FF] group-hover:to-[#7C3AED] flex items-center justify-between">
                  <span>View Portfolio</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1.5 transition-transform duration-300 text-[#9D26FF] group-hover:text-white"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
