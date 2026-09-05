"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  Play
} from "lucide-react";

export default function ProjectShowcaseModal({ project, isOpen, onClose, categoryName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Prevent background scrolling when showcase is open & reset active slide
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  // Process project media items & gallery with robust JSON parsing
  let mediaList = [];
  let rawMedia = project.mediaItems;
  if (typeof rawMedia === 'string') {
    try {
      rawMedia = JSON.parse(rawMedia);
    } catch (e) {
      rawMedia = [];
    }
  }

  let rawGallery = project.gallery;
  if (typeof rawGallery === 'string') {
    try {
      rawGallery = JSON.parse(rawGallery);
    } catch (e) {
      rawGallery = [];
    }
  }

  if (Array.isArray(rawMedia) && rawMedia.length > 0) {
    mediaList = rawMedia.map((m, i) => ({
      id: m.id || `m_${i}`,
      url: typeof m === 'string' ? m : (m.url || ''),
      mediaType: m.mediaType || (m.url && m.url.match(/\.(mp4|webm|mov|m4v)$/i) ? 'video' : 'image'),
      videoUrl: m.videoUrl || '',
      videoFile: m.videoFile || '',
      isCover: Boolean(m.isCover || i === 0),
      displayOrder: typeof m.displayOrder === 'number' ? m.displayOrder : i
    }));
  } else if (Array.isArray(rawGallery) && rawGallery.length > 0) {
    mediaList = rawGallery.map((url, i) => ({
      id: `g_${i}`,
      url: typeof url === 'string' ? url : (url?.url || ''),
      mediaType: 'image',
      isCover: i === 0,
      displayOrder: i
    }));
  } else {
    const fallbackUrl = project.coverImage || project.image || project.thumbnail || '/assets/portfolio-web-v4.jpg';
    mediaList = [{
      id: 'm_0',
      url: fallbackUrl,
      mediaType: project.mediaType || 'image',
      isCover: true,
      displayOrder: 0
    }];
  }

  // Filter out items with empty URLs
  mediaList = mediaList.filter(m => m.url || m.videoUrl || m.videoFile);

  if (mediaList.length === 0) {
    mediaList = [{
      id: 'm_fallback',
      url: project.coverImage || project.image || '/assets/portfolio-web-v4.jpg',
      mediaType: 'image',
      isCover: true,
      displayOrder: 0
    }];
  }

  // Sort media list by displayOrder if available
  mediaList.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Identify cover item and remaining gallery items
  const coverItem = mediaList.find(m => m.isCover) || mediaList[0] || {};

  // Build complete ordered artwork list starting with Cover Image -> Image 2 -> Image 3...
  const allOrderedItems = [
    coverItem,
    ...mediaList.filter(m => (m.id ? m.id !== coverItem.id : m.url !== coverItem.url))
  ];

  const currentMedia = allOrderedItems[activeIndex] || allOrderedItems[0] || {};
  const hasMultipleMedia = allOrderedItems.length > 1;

  const handleNext = () => {
    if (!hasMultipleMedia) return;
    setActiveIndex((prev) => (prev + 1) % allOrderedItems.length);
  };

  const handlePrev = () => {
    if (!hasMultipleMedia) return;
    setActiveIndex((prev) => (prev === 0 ? allOrderedItems.length - 1 : prev - 1));
  };

  const displayCategory = categoryName || project.categoryName || project.service || 'Graphic Design';
  const subCategory = project.subCategory || project.categorySlug || '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[var(--background)] text-[var(--foreground)] flex flex-col min-h-screen">
        {/* Subtle Ambient Glow */}
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/5 rounded-full blur-[200px] pointer-events-none" />

        {/* STICKY TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-50 w-full bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>

            <div className="h-4 w-px bg-purple-500/30 hidden sm:block" />

            <div className="truncate hidden sm:block">
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-[10px] font-bold uppercase tracking-wider">
                {displayCategory}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {hasMultipleMedia && (
              <span className="text-xs font-mono text-[var(--foreground-muted)] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--border)]">
                {activeIndex + 1} / {allOrderedItems.length}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-[var(--background-alt)] border border-white/10 hover:border-[var(--border)] text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors"
              aria-label="Close Project Showcase"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* SHOWCASE BODY */}
        <main className="relative z-10 flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
          
          {/* 1. PROJECT INFORMATION HEADER */}
          <div className="space-y-4 text-left border-b border-[var(--border)] pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-wider">
                {displayCategory}
              </span>
              {subCategory && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--foreground-muted)] text-xs font-semibold capitalize">
                  {subCategory.replace(/-/g, ' ')}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight">
              {project.title}
            </h1>

            {project.description && (
              <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-4xl pt-1">
                {project.description}
              </p>
            )}

            {/* Optional Metadata Row */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[var(--foreground-muted)] font-medium">
              {project.client && (
                <div>
                  <span className="text-gray-500 uppercase font-bold mr-1.5">Client:</span>
                  <span className="text-[var(--foreground-heading)] font-semibold">{project.client}</span>
                </div>
              )}

              <div>
                <span className="text-gray-500 uppercase font-bold mr-1.5">Agency:</span>
                <span className="text-[#9D26FF] font-semibold">Derixio Digital Agency</span>
              </div>

              {(project.projectUrl || project.websiteUrl) && (
                <a
                  href={project.projectUrl || project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[#9D26FF] hover:text-[#8500ED] font-bold transition-colors ml-auto"
                >
                  <span>Live Project Link</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* 2. PROBLEM, SOLUTION & RESULTS/PROGRESS CASE STUDY BREAKDOWN (3 TEXT BOXES) */}
          {(() => {
            let prob = project.problem || '';
            let sol = project.solution || '';
            let res = project.results || project.result || '';

            if (project.caseStudyDetails && (!prob || !sol || !res)) {
              const cleanHtml = project.caseStudyDetails.replace(/<!--[\s\S]*?-->/g, '');
              const probMatch = cleanHtml.match(/(?:<b>\s*Client Problem:?\s*<\/b>|<b>\s*Problem:?\s*<\/b>)([\s\S]*?)(?:<h2|<b>\s*Our Solution|<b>\s*Solution:?|<b>\s*Results:?|$)/i);
              const solMatch = cleanHtml.match(/(?:<b>\s*Our Solution:?\s*<\/b>|<b>\s*Solution:?\s*<\/b>)([\s\S]*?)(?:<h2|<b>\s*Results:?|<b>\s*Result:?|$)/i);
              const resMatch = cleanHtml.match(/(?:<b>\s*Results:?\s*<\/b>|<b>\s*Result:?\s*<\/b>)([\s\S]*?)(?:$)/i);

              if (!prob && probMatch) prob = probMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
              if (!sol && solMatch) sol = solMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
              if (!res && resMatch) res = resMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            }

            if (!res && (project.shortDescription || project.description)) {
              res = project.shortDescription || project.description;
            }

            const hasBreakdown = prob || sol || res || project.caseStudyDetails;
            if (!hasBreakdown) return null;

            return (
              <div className="space-y-6 pt-2 border-t border-[var(--border)]">
                <div className="flex items-center space-x-2 text-[#9D26FF] font-mono text-xs font-bold uppercase tracking-wider">
                  <Layers size={14} />
                  <span>CASE STUDY BREAKDOWN & PROGRESS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Box 1: Problem */}
                  <div className="p-6 rounded-2xl bg-[var(--card)] border border-red-500/30 shadow-lg flex flex-col">
                    <h3 className="text-sm font-mono font-bold text-red-400 uppercase tracking-wider mb-2.5 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 inline-block" />
                      1. Problem:
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                      {prob || "High advertising costs, ineffective keyword targeting, and limited organic sales visibility."}
                    </p>
                  </div>

                  {/* Box 2: Solution */}
                  <div className="p-6 rounded-2xl bg-[var(--card)] border border-emerald-500/30 shadow-lg flex flex-col">
                    <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 inline-block" />
                      2. Solution:
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                      {sol || "Complete PPC campaign overhaul, negative keyword filtering, placement bid optimization, and listing enhancement."}
                    </p>
                  </div>

                  {/* Box 3: Results & Progress */}
                  <div className="p-6 rounded-2xl bg-[var(--card)] border border-purple-500/30 shadow-lg flex flex-col">
                    <h3 className="text-sm font-mono font-bold text-[#9D26FF] uppercase tracking-wider mb-2.5 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9D26FF] mr-2 inline-block" />
                      3. Results & Progress:
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line flex-grow">
                      {res || "Significant reduction in ACoS, increased monthly ad sales, and improved conversion performance."}
                    </p>
                  </div>
                </div>

                {project.caseStudyDetails && !prob && !sol && (
                  <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed prose prose-invert max-w-none mt-4">
                    <div dangerouslySetInnerHTML={{ __html: project.caseStudyDetails }} />
                  </div>
                )}
              </div>
            );
          })()}

          {/* 3. INTERACTIVE LIGHTBOX GALLERY / PICTURE */}
          <div className="relative w-full group pt-2 border-t border-[var(--border)]">
            <div className="flex items-center space-x-2 text-[#9D26FF] font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <span>CASE STUDY SCREENSHOTS & ASSETS</span>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] shadow-2xl min-h-[300px] flex items-center justify-center p-2 sm:p-4">
              
              {/* Media Content */}
              {currentMedia.mediaType === 'video' || (activeIndex === 0 && project.service === 'Video & Motion Design') ? (
                currentMedia.videoFile || project.videoFile ? (
                  <video
                    controls
                    autoPlay
                    key={currentMedia.url || currentMedia.videoFile}
                    poster={currentMedia.url || project.coverImage}
                    className="w-full h-auto max-h-[75vh] block rounded-xl object-contain"
                  >
                    <source src={currentMedia.videoFile || project.videoFile} type="video/mp4" />
                  </video>
                ) : (currentMedia.videoUrl || project.videoUrl) ? (
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden">
                    <iframe
                      src={currentMedia.videoUrl || project.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={`${project.title} - Asset ${activeIndex + 1}`}
                    className="w-full h-auto max-h-[75vh] block rounded-xl object-contain mx-auto"
                  />
                )
              ) : (
                <img
                  src={currentMedia.url}
                  alt={`${project.title} - Asset ${activeIndex + 1}`}
                  className="w-full h-auto max-h-[75vh] block rounded-xl object-contain mx-auto"
                />
              )}

              {/* Cover Tag on Image 1 */}
              {activeIndex === 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold shadow-lg z-20">
                  Cover Image
                </span>
              )}

              {/* Navigation Arrow Controls */}
              {hasMultipleMedia && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#9D26FF] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/80 hover:bg-[#9D26FF] text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all hover:scale-110"
                    aria-label="Next Image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip Below Lightbox Display */}
            {hasMultipleMedia && (
              <div className="flex items-center space-x-3 overflow-x-auto pt-4 pb-2 px-1 scrollbar-none">
                {allOrderedItems.map((item, idx) => (
                  <button
                    key={item.id || idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      idx === activeIndex
                        ? 'border-[#9D26FF] ring-2 ring-[#9D26FF]/50 scale-105 opacity-100'
                        : 'border-[var(--border)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-0.5 left-0.5 px-1 rounded bg-amber-500 text-black text-[8px] font-bold">
                        Cover
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. BOTTOM PROJECT CONVERSION CTA */}
          <section className="mt-16 py-12 px-6 sm:px-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] mb-3">
              Inspired by This {displayCategory} Showcase?
            </h2>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Let Derixio engineering and design teams create a high-converting portfolio piece for your brand.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                onClick={onClose}
                className="px-8 py-3.5 bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white font-bold rounded-2xl shadow-xl shadow-purple-950/60 transition-all duration-300 hover:scale-105 text-sm inline-flex items-center space-x-2"
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-[var(--foreground-muted)] hover:text-white font-bold text-sm transition-all"
              >
                Close Showcase
              </button>
            </div>
          </section>

        </main>
      </div>
    </AnimatePresence>
  );
}
