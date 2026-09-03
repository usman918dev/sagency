"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
/**
 * Founders data is imported from the shared source of truth.
 * Edit src/lib/teamData.js to update both these profile cards
 * and the /about page Person schema simultaneously.
 */
import { foundersData } from "@/lib/teamData";

const TeamSection = () => {
  const founders = foundersData;

  return (
    <section className="relative py-24 sm:py-32 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Gently Pulsing Ambient Backlight Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-[#9D26FF]/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-[#9D26FF]/10 rounded-full blur-[180px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full agenko-glass border border-[#9D26FF]/30 text-[#9D26FF] text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 shadow-xl">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>FOUNDING TEAM</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--foreground-heading)] tracking-tight leading-tight mb-6">
            <span className="font-light">Meet the Founders </span>
            <span className="font-extrabold text-[#9D26FF]">
              Behind Derixio
            </span>
          </h2>

          <p className="text-[var(--foreground-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The vision, creativity, and leadership driving Derixio&apos;s growth and innovation.
          </p>
        </motion.div>

        {/* Founder Showcase Grid (Desktop 2-col / Mobile Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 max-w-6xl mx-auto items-stretch pt-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              className="group relative flex flex-col justify-end"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
            >
              {/* Soft Animated Glowing Backlight Behind Card */}
              <div className="absolute -inset-0.5 rounded-[34px] bg-gradient-to-r from-[#9D26FF]/20 via-[#9D26FF]/10 to-[#9D26FF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none"></div>

              {/* Outer Layered Glass Card Wrapper */}
              <div className="relative w-full rounded-[32px] bg-[var(--card)] backdrop-blur-2xl border border-[var(--border)] group-hover:border-[#9D26FF]/50 p-8 sm:p-10 md:p-12 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">

                {/* Subtle Inner Lighting Glint Arc */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#9D26FF]/10 to-transparent rounded-tr-[32px] rounded-bl-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none overflow-hidden"></div>

                {/* Overlapping Image & Header Row */}
                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 -mt-16 sm:-mt-20 mb-8">

                  {/* Fully Visible Floating Founder Image Box (Unclipped Rounded Corners) */}
                  <div className="relative w-40 h-48 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-500 shadow-xl flex-shrink-0 bg-[var(--background-alt)] z-10">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      style={{ objectPosition: 'center 10%' }}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    {/* Soft Dark Vignette for Premium Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Fallback Initials */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#9D26FF]/30 to-slate-800 flex items-center justify-center rounded-2xl hidden">
                      <span className="text-white font-bold text-2xl sm:text-3xl">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>

                  {/* Header Details (Name, Role Gradient Badge, Modern LinkedIn Button) */}
                  <div className="pt-2 sm:pt-14 flex-grow">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-3 group-hover:text-[#9D26FF] transition-colors duration-300">
                      {founder.name}
                    </h3>

                    {/* Premium Role Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] shadow-sm">
                        {founder.role}
                      </span>
                    </div>

                    {/* Modern LinkedIn Button with Hover Shadow Effect */}
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2] border border-[#0A66C2]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,102,194,0.5)] hover:-translate-y-0.5"
                      >
                        <Linkedin size={14} className="text-[#0A66C2] group-hover:text-white transition-colors" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Refined Concise Bio Description */}
                <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed flex-grow font-normal tracking-wide">
                  {founder.bio}
                </p>

                {/* View Full Profile Button */}
                <div className="mt-6 pt-5 border-t border-[var(--border)] flex items-center justify-between">
                  <Link
                    href={founder.profileUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9D26FF] hover:bg-[#8500ED] border border-[#9D26FF] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight size={15} className="text-white group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Subtle Hover Glow Strip at Card Base */}
                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-[#9D26FF]/90 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;