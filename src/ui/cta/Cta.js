"use client";
import React from "react";
import { motion } from "framer-motion";
import Button, { SecondButton } from "../btn/Button";
import { XCircle, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-24 bg-[var(--background)] bg-agenko-grid"
    >
      {/* Content Box */}
      <div
        className="relative z-10 px-6 py-20 text-center overflow-hidden border-y border-[var(--border)] bg-[var(--card)]"
      >
        {/* Ambient Backlight Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[#9D26FF] text-sm font-bold uppercase tracking-widest mb-4">
            Have A Project In Mind?
          </p>
          <h2 className="text-[var(--foreground-heading)] text-4xl sm:text-5xl md:text-6xl leading-tight mb-8">
            <span className="font-light">Let&apos;s Build Something </span><br className="hidden sm:inline" />
            <span className="font-extrabold text-[#9D26FF]">Extraordinary Together</span>
          </h2>
          <SecondButton text={"Start Your Project"} href={"/contact"} />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

export const CallToActionS = () => {
  const servicesData = [
    {
      id: "amazon",
      title: "Amazon Growth",
      problems: [
        "High traffic but low sales",
        "Product listing fails to convert visitors",
        "Weak product images reduce buyer trust",
        "A+ Content is missing or ineffective",
        "High PPC spend with low profitability",
        "Competitors are getting better visibility",
      ],
      solutions: [
        "Conversion-focused Amazon listing strategy",
        "Persuasive content built to drive purchases",
        "High-impact product images and infographics",
        "Engaging A+ Content that builds trust",
        "ROI-focused PPC optimization",
        "Keyword & competitor visibility strategies",
      ],
    },
    {
      id: "web-dev",
      title: "Web Development",
      problems: [
        "Outdated website design",
        "Visitors leave without taking action",
        "Poor mobile experience",
        "Slow-loading pages",
        "Website does not reflect the brand",
        "Low visitor-to-lead conversion",
      ],
      solutions: [
        "Modern and professional website design",
        "Clear user journeys and strong CTAs",
        "Fully responsive mobile experience",
        "Fast and optimized website performance",
        "Custom design aligned with the brand",
        "Conversion-focused pages built to generate leads",
      ],
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      problems: [
        "Inconsistent brand visuals",
        "Designs fail to stand out",
        "No clear visual identity",
        "Inconsistent social media content",
        "Product visuals fail to grab attention",
        "Brand looks less professional than rivals",
      ],
      solutions: [
        "Consistent visual identity across platforms",
        "Creative designs that capture attention",
        "Clear and memorable brand system",
        "Consistent social media design direction",
        "High-impact product and marketing visuals",
        "Premium designs that strengthen brand image",
      ],
    },
    {
      id: "seo",
      title: "SEO",
      problems: [
        "Website does not rank on Google",
        "Low organic traffic",
        "Competitors rank higher",
        "Wrong keywords are being targeted",
        "Technical SEO issues hurt visibility",
        "Traffic does not generate enough leads",
      ],
      solutions: [
        "Strategic keyword research",
        "Organic traffic growth strategy",
        "Competitor-based ranking strategy",
        "High-intent keyword targeting",
        "On-page and technical SEO optimization",
        "SEO focused on qualified traffic and sales",
      ],
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      problems: [
        "Marketing spend delivers unclear results",
        "Ads reach the wrong audience",
        "Lead generation is inconsistent",
        "Marketing channels are disconnected",
        "Campaign performance is difficult to track",
        "No clear marketing strategy",
      ],
      solutions: [
        "ROI-focused marketing strategy",
        "Precise audience targeting",
        "Consistent lead generation campaigns",
        "Connected multi-channel marketing",
        "Clear performance tracking and reporting",
        "Data-driven strategy for business growth",
      ],
    },
    {
      id: "video-motion",
      title: "Video & Motion Design",
      problems: [
        "Videos lose attention in the first few seconds",
        "Content looks basic or generic",
        "Weak storytelling and pacing",
        "Inconsistent brand style",
        "Motion graphics lack engagement",
        "Videos generate views but not action",
      ],
      solutions: [
        "Strong hooks designed to stop the scroll",
        "Professional and engaging video editing",
        "Clear storytelling and dynamic pacing",
        "Consistent branded video style",
        "Custom motion graphics and animations",
        "Videos designed for engagement and conversion",
      ],
    },
  ];

  const [activeServiceIdx, setActiveServiceIdx] = React.useState(0);
  const activeService = servicesData[activeServiceIdx];

  const handleNextService = () => {
    setActiveServiceIdx((prev) => (prev + 1) % servicesData.length);
  };

  const handlePrevService = () => {
    setActiveServiceIdx((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[var(--background)] bg-agenko-grid">
      {/* Content Container with Scroll-Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 text-center max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Eyebrow Label */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--card)]/80 border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <span>SOUND FAMILIAR?</span>
        </div>

        {/* Headline — Slightly enlarged ~6% for premium desktop impact */}
        <h2 className="text-[var(--foreground-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight mb-9 max-w-5xl mx-auto tracking-tight">
          Every Problem Has A Solution — <span className="text-[#9D26FF]">And We've Built Yours.</span>
        </h2>

        {/* Structured 2-Card Grid — Slightly enlarged ~6% card dimensions & padding */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-9 text-left items-stretch">
          {/* Left Card: THE PROBLEM */}
          <div className="p-6 sm:p-7 md:p-8 rounded-3xl bg-[var(--card)]/80 border border-[var(--border)] relative overflow-hidden flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400">
                THE PROBLEM
              </span>
              <span className="text-xs sm:text-sm text-[var(--foreground-muted)] font-normal">
                {activeService.title}
              </span>
            </div>

            <ul className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-start">
              {activeService.problems.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm md:text-[16.5px] text-[var(--foreground-muted)] font-normal leading-relaxed">
                  <XCircle size={18} className="text-amber-500/90 dark:text-amber-400/90 shrink-0 mt-0.5" />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: THE DERIXIO SOLUTION */}
          <div className="p-6 sm:p-7 md:p-8 rounded-3xl bg-[var(--card)]/80 border border-[#9D26FF]/30 relative overflow-hidden flex flex-col h-full shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF]">
                THE DERIXIO SOLUTION
              </span>
              <span className="text-xs sm:text-sm text-[#9D26FF] font-normal">
                {activeService.title}
              </span>
            </div>

            <ul className="space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-start">
              {activeService.solutions.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm md:text-[16.5px] text-[var(--foreground-subtle)] font-normal leading-relaxed">
                  <CheckCircle2 size={18} className="text-[#9D26FF] shrink-0 mt-0.5" />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual Services Flow Bar — Strict Single Line Horizontal Row */}
        <div className="w-full max-w-[970px] mx-auto mb-8 sm:mb-10 p-2 sm:p-2.5 rounded-2xl bg-[var(--card)]/80 border border-[var(--border)] relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-start md:justify-between overflow-x-auto no-scrollbar py-1 px-1 gap-1.5 sm:gap-2 font-medium w-full whitespace-nowrap flex-nowrap">
            {/* Left Arrow & Struggling Business Badge */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 font-bold whitespace-nowrap text-[8.5px] sm:text-[9px] md:text-[9.5px] w-max min-w-max inline-flex items-center justify-center shrink-0">
                Struggling business
              </div>
              <button
                onClick={handlePrevService}
                className="p-1 text-[var(--foreground-muted)] hover:text-[#9D26FF] hover:scale-110 transition-all duration-200 shrink-0 cursor-pointer"
                aria-label="Previous Service"
                title="Previous Service"
              >
                <ArrowRight size={13} className="rotate-180" />
              </button>
            </div>

            {/* 6 Service Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {servicesData.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceIdx(idx)}
                  className={`px-2.5 py-1 rounded-full text-[8.5px] sm:text-[9px] md:text-[9.5px] font-semibold whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer w-max min-w-max inline-flex items-center justify-center ${
                    activeServiceIdx === idx
                      ? "bg-[var(--card-hover)] text-[#9D26FF] border border-[#9D26FF]/50 shadow-sm scale-105"
                      : "bg-[var(--card-alt)] text-[var(--foreground-muted)] hover:text-[var(--foreground-heading)] border border-[var(--border)] hover:border-[#9D26FF]/30"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Right Arrow & Consistent Growth Badge */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
              <button
                onClick={handleNextService}
                className="p-1 text-[#9D26FF] hover:text-[#8B5CF6] hover:scale-110 transition-all duration-200 shrink-0 cursor-pointer"
                aria-label="Next Service"
                title="Next Service"
              >
                <ArrowRight size={13} />
              </button>
              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF] font-extrabold whitespace-nowrap text-[8.5px] sm:text-[9px] md:text-[9.5px] w-max min-w-max inline-flex items-center justify-center shrink-0">
                Consistent growth
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button — Clean Vertical Spacing Below Flow Bar */}
        <div className="flex justify-center pt-3 sm:pt-6">
          <Button text={"Get Free Consultation"} href={"/contact"} />
        </div>
      </motion.div>
    </section>
  );
};