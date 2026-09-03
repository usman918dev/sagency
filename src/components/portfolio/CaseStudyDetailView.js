"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Play,
  Maximize2,
  X,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Layers,
  ShoppingBag,
  Code,
  Palette,
  ExternalLink
} from "lucide-react";

export default function CaseStudyDetailView({ project }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!project) return null;

  // Extract gallery images safely
  const galleryImages = Array.isArray(project.gallery) && project.gallery.length > 0
    ? project.gallery
    : [project.coverImage || project.image || "/assets/portfolio-web-v4.jpg"];

  // Amazon Growth structured sections
  const amazonSections = project.amazonSections || {
    listingImages: galleryImages.slice(0, 3),
    aplusImages: galleryImages.slice(1, 4),
    adCreatives: [galleryImages[0]]
  };

  const isAmazon = project.filterTag === "amazon" || (project.category && project.category.includes("Amazon"));

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 sm:pt-28 md:pt-32 pb-24 relative overflow-hidden bg-agenko-grid">
      {/* Background Atmosphere Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="g-px relative z-10 max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* ── CASE STUDY HERO ───────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>{project.category || "Case Study"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-[1.1] mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[var(--foreground-muted)] font-normal leading-relaxed max-w-3xl">
            {project.shortDescription || project.description}
          </p>
        </section>

        {/* ── PROJECT OVERVIEW GRID ─────────────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            <div className="pt-2 md:pt-0 md:px-4">
              <span className="text-[11px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                Client / Brand
              </span>
              <p className="text-sm font-bold text-[var(--foreground-heading)]">
                {project.brand || project.client || "Confidential Client"}
              </p>
            </div>

            <div className="pt-2 md:pt-0 md:px-4">
              <span className="text-[11px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                Industry
              </span>
              <p className="text-sm font-bold text-[var(--foreground-heading)]">
                {project.industry || "Digital & Commerce"}
              </p>
            </div>

            <div className="pt-2 md:pt-0 md:px-4 col-span-2 md:col-span-2">
              <span className="text-[11px] font-bold text-[#9D26FF] uppercase tracking-wider block mb-1">
                Services Delivered
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {Array.isArray(project.services) && project.services.length > 0 ? (
                  project.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--background-alt)] text-[var(--foreground-heading)] border border-[var(--border)]"
                    >
                      {srv}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-bold text-[var(--foreground-heading)]">
                    {project.category || "Full-Service Solution"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN HERO MEDIA ───────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="relative w-full aspect-[16/9] max-h-[600px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--background-alt)] group">
            {project.mediaType === "video" && project.videoUrl ? (
              <div className="relative w-full h-full">
                <video
                  src={project.videoUrl}
                  controls
                  poster={project.coverImage || project.image}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <>
                <Image
                  src={project.coverImage || project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  onClick={() => setLightboxImage(project.coverImage || project.image)}
                  className="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/70 text-white hover:bg-[#9D26FF] backdrop-blur-md transition-colors border border-white/20"
                  title="Expand Visual"
                >
                  <Maximize2 size={18} />
                </button>
              </>
            )}
          </div>
        </section>

        {/* ── THE CHALLENGE & THE APPROACH ─────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* Challenge */}
          <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest block mb-2">
              THE CHALLENGE
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-4">
              Identifying the Bottleneck
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              {project.challenge ||
                "The client faced low engagement and conversion rates due to outdated visuals, unoptimized customer friction points, and inconsistent brand storytelling across digital customer touchpoints."}
            </p>
          </div>

          {/* Approach */}
          <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest block mb-2">
              THE APPROACH
            </span>
            <h2 className="text-2xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-4">
              Derixio Growth Strategy
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              {project.approach ||
                "We conducted a holistic design and performance audit, redesigning customer journey assets into high-converting visual stories built specifically for mobile accessibility and high-intent conversion."}
            </p>
          </div>
        </section>

        {/* ── THE WORK (STRUCTURED VISUAL DELIVERABLES) ────────────────────── */}
        <section className="mb-20">
          <div className="border-b border-[var(--border)] pb-4 mb-10">
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest">
              DELIVERABLE BREAKDOWN
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight">
              The Work
            </h2>
          </div>

          {/* ── SPECIAL LAYOUT FOR AMAZON GROWTH (Listing → A+ → Ads) ── */}
          {isAmazon ? (
            <div className="space-y-16">
              {/* Framework Banner */}
              <div className="p-6 rounded-2xl bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#9D26FF] block mb-1">
                  AMAZON CONVERSION FRAMEWORK
                </span>
                <p className="text-sm sm:text-base font-bold text-[var(--foreground-heading)]">
                  ATTRACT (Ads) → CONVINCE (Listing Images) → BUILD TRUST (A+ Content)
                </p>
              </div>

              {/* 01 — Amazon Listing */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#9D26FF] text-white text-xs font-extrabold">
                    01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground-heading)]">
                    Amazon Listing Images
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mb-6 max-w-2xl">
                  Main white-background product visuals, lifestyle compositions, feature callout infographics, and benefit comparison graphics.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {amazonSections.listingImages.map((imgUrl, i) => (
                    <div
                      key={`lst_${i}`}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] cursor-pointer shadow-md hover:shadow-xl transition-all"
                    >
                      <Image
                        src={imgUrl}
                        alt={`Amazon Listing Image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 02 — A+ Content */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#9D26FF] text-white text-xs font-extrabold">
                    02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground-heading)]">
                    A+ Content & Brand Story
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mb-6 max-w-2xl">
                  Full A+ modules, product comparison tables, ingredient transparency banners, and brand storytelling graphics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {amazonSections.aplusImages.map((imgUrl, i) => (
                    <div
                      key={`apl_${i}`}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] cursor-pointer shadow-md hover:shadow-xl transition-all"
                    >
                      <Image
                        src={imgUrl}
                        alt={`A+ Content Module ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 — Amazon Advertising */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#9D26FF] text-white text-xs font-extrabold">
                    03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground-heading)]">
                    Amazon Advertising & Campaign Creatives
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] mb-6 max-w-2xl">
                  Sponsored Brands video ads, custom ad banners, and high-CTR promotional creatives designed to drive cold traffic.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {amazonSections.adCreatives.map((imgUrl, i) => (
                    <div
                      key={`ad_${i}`}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] cursor-pointer shadow-md hover:shadow-xl transition-all"
                    >
                      <Image
                        src={imgUrl}
                        alt={`Ad Creative ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── STANDARD VISUAL GALLERY FOR OTHER SERVICES ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((imgUrl, i) => (
                <div
                  key={`gal_${i}`}
                  onClick={() => setLightboxImage(imgUrl)}
                  className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} Asset ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── THE OUTCOME (QUALITATIVE REAL OUTCOMES) ───────────────────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl mb-20">
          <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest block mb-2">
            THE OUTCOME
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-4">
            Delivered Impact & Brand Growth
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed mb-6">
            {project.outcome ||
              "The brand successfully achieved elevated customer perception, higher detail page engagement, and a scalable design system for future product line expansions."}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground-heading)]">
              <CheckCircle2 size={16} className="text-[#9D26FF]" />
              <span>Full Rights & Asset Handoff</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--foreground-heading)]">
              <ShieldCheck size={16} className="text-[#9D26FF]" />
              <span>Mobile-Optimized Assets</span>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="py-16 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-4">
              Have a project in mind?
            </h2>
            <p className="text-sm sm:text-base text-[var(--foreground-muted)] mb-8 font-normal">
              Let's build something that moves your brand forward.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-[#9D26FF] hover:bg-[#8500ED] text-white text-sm font-bold shadow-xl shadow-purple-900/30 hover:scale-105 transition-all space-x-2"
            >
              <span>Start a Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>

      {/* ── HIGH-RES LIGHTBOX MODAL ───────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-[16/10] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={lightboxImage}
                alt="Case Study Detail"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
