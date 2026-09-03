"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Maximize2,
  X
} from "lucide-react";

export default function AmazonPpcCaseStudyView({ caseStudy }) {
  const [activeImageModal, setActiveImageModal] = useState(null);

  if (!caseStudy) {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-32 pb-24 text-center text-[var(--foreground)]">
        <h1 className="text-3xl font-extrabold mb-4 text-[var(--foreground-heading)]">Case Study Not Found</h1>
        <Link href="/portfolio/amazon-ppc" className="text-[#9D26FF] hover:underline text-sm font-semibold">
          Return to Amazon PPC Case Studies Directory
        </Link>
      </main>
    );
  }

  const {
    title,
    shortDescription,
    summary,
    resultImageUrl,
    mainResultImageUrl,
    coverImageUrl,
    caseStudyDetails,
    autoResult
  } = caseStudy;

  const image = resultImageUrl || mainResultImageUrl || coverImageUrl;
  const descriptionText = shortDescription || summary;

  const detectedMetrics = Array.isArray(autoResult?.metrics) ? autoResult.metrics : [];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden">
      {/* Derixio Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="g-px max-w-4xl mx-auto relative z-10 pt-6 pb-24">
        {/* Back Link */}
        <Link
          href="/portfolio/amazon-ppc"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] hover:text-[#9D26FF] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Amazon PPC Case Studies</span>
        </Link>

        {/* 1. CASE STUDY TITLE & BADGE */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="text-[#9D26FF]" />
            <span>AMAZON PPC CASE STUDY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-4">
            {title}
          </h1>

          {/* 2. SHORT DESCRIPTION */}
          {descriptionText && (
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-3xl">
              {descriptionText}
            </p>
          )}
        </div>

        {/* 3. CASE STUDY DETAILS (MUST COME BEFORE THE RESULT SCREENSHOT) */}
        {caseStudyDetails && caseStudyDetails.trim() !== '' && (
          <div className="mb-14">
            <h2 className="text-lg sm:text-xl font-bold text-[#9D26FF] tracking-wider uppercase mb-6 border-b border-[var(--border)] pb-3">
              Case Study Details
            </h2>

            <div
              className="prose max-w-none text-[var(--foreground)] text-base sm:text-lg leading-relaxed space-y-4 prose-p:my-3 prose-strong:text-[var(--foreground-heading)] prose-strong:font-extrabold prose-h2:text-[var(--foreground-heading)] prose-h2:text-xl prose-h3:text-[var(--foreground-heading)] prose-h3:text-lg prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-1.5"
              dangerouslySetInnerHTML={{ __html: caseStudyDetails }}
            />
          </div>
        )}

        {/* 4. RESULT SCREENSHOT */}
        {image && (
          <div className="mb-14">
            <h2 className="text-lg sm:text-xl font-bold text-[#9D26FF] tracking-wider uppercase mb-6 border-b border-[var(--border)] pb-3">
              Result
            </h2>

            <div
              onClick={() => setActiveImageModal(image)}
              className="relative w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--card)] p-2 group cursor-pointer"
            >
              <div className="relative w-full h-auto min-h-[300px] sm:min-h-[450px]">
                <Image
                  src={image}
                  alt={title}
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-[#9D26FF] text-xs font-bold flex items-center space-x-1.5 border border-[#9D26FF]/40 shadow-xl">
                  <Maximize2 size={14} />
                  <span>Enlarge Result Screenshot</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. RESULTS / EXTRACTED METRICS */}
        {detectedMetrics.length > 0 && (
          <div className="mb-14">
            <h2 className="text-lg sm:text-xl font-bold text-[#9D26FF] tracking-wider uppercase mb-6 border-b border-[var(--border)] pb-3">
              Results
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {detectedMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-center shadow-lg hover:border-[#9D26FF] transition-colors"
                >
                  <p className="text-xs uppercase tracking-wider font-bold text-[var(--foreground-muted)] mb-1">
                    {m.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-[var(--foreground-heading)]">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {activeImageModal && (
        <div
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-pointer"
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors border border-white/20"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={activeImageModal}
                alt="Enlarged result screenshot"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Clean Bottom CTA */}
      <section className="py-16 bg-[var(--card)] border-t border-[var(--border)]">
        <div className="g-px text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] mb-4 tracking-tight">
            Ready to Engineer Similar{" "}
            <span className="text-[#9D26FF]">Amazon PPC Results</span>?
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
            Partner with Derixio's Amazon PPC specialists for data-driven campaign structuring, bid optimization, and lower ACoS.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl text-xs sm:text-sm"
          >
            Schedule Free Strategy Session
          </Link>
        </div>
      </section>
    </main>
  );
}
