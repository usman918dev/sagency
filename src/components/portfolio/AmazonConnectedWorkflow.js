"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Layout, ShoppingBag, TrendingUp, ArrowRight } from "lucide-react";

const workflows = {
  "amazon-listing-images": {
    badge: "OUR LISTING WORKFLOW",
    heading: "How We Execute Amazon Listing Images",
    description: "A practical framework for transforming product information and customer insights into clear, conversion-focused Amazon listing visuals.",
    icon: Layers,
    steps: [
      {
        number: "01",
        title: "Product & Market Research",
        desc: "Understand the product, target customer, category, competitors, and existing listing."
      },
      {
        number: "02",
        title: "Listing Creative Strategy",
        desc: "Identify key selling points, product benefits, customer concerns, and visual order."
      },
      {
        number: "03",
        title: "Creative Direction",
        desc: "Plan main image, feature graphics, lifestyle visuals, comparisons, and content."
      },
      {
        number: "04",
        title: "Design & Refinement",
        desc: "Create polished Amazon-ready listing images and refine visual presentation."
      },
      {
        number: "05",
        title: "Final Review & Delivery",
        desc: "Check consistency, quality, Amazon specs, and prepare final listing assets."
      }
    ]
  },
  "a-plus-content": {
    badge: "OUR A+ CONTENT WORKFLOW",
    heading: "How We Build Amazon A+ Content",
    description: "A professional framework for structuring A+ Content around brand storytelling, product benefits, customer intent, and conversion.",
    icon: Layout,
    steps: [
      {
        number: "01",
        title: "Market & Competitor Research",
        desc: "Analyze customer reviews, niche competitors, and key product differentiators."
      },
      {
        number: "02",
        title: "Content Structure & Storytelling",
        desc: "Map out storytelling module layout from brand header down to comparison tables."
      },
      {
        number: "03",
        title: "Conversion-Focused Copy",
        desc: "Draft benefit-focused, search-intent optimized copy for each content module."
      },
      {
        number: "04",
        title: "Visual Design & Module Creation",
        desc: "Build high-impact custom banner graphics, feature highlights, and comparison charts."
      },
      {
        number: "05",
        title: "Review & Amazon Compliance",
        desc: "Check Seller Central requirements, mobile previews, and deliver ready-to-upload files."
      }
    ]
  },
  "amazon-brand-store": {
    badge: "OUR BRAND STORE WORKFLOW",
    heading: "How We Build Amazon Brand Stores",
    description: "How we plan Store structure, organize products, create branded visuals, and build a clear, engaging shopping journey.",
    icon: ShoppingBag,
    steps: [
      {
        number: "01",
        title: "Brand & Store Strategy",
        desc: "Audit product catalog, target audience, and store navigation architecture."
      },
      {
        number: "02",
        title: "Store Structure & Navigation",
        desc: "Map out intuitive page hierarchy, collection pages, and homepage layout."
      },
      {
        number: "03",
        title: "Visual Direction",
        desc: "Plan hero banners, lifestyle promotional tiles, category entry graphics, and video tiles."
      },
      {
        number: "04",
        title: "Store Build & Content",
        desc: "Build custom store pages, link product ASINs, and format responsive layouts."
      },
      {
        number: "05",
        title: "Review & Optimization",
        desc: "Validate Storefront experience on mobile and desktop before publishing to Amazon."
      }
    ]
  },
  "amazon-campaigns": {
    badge: "OUR CAMPAIGN WORKFLOW",
    heading: "How We Manage Amazon Campaigns",
    description: "How we structure PPC ad campaigns, research target keywords, optimize daily bids, and deliver transparent ROAS reporting.",
    icon: TrendingUp,
    steps: [
      {
        number: "01",
        title: "Account & Campaign Audit",
        desc: "Audit historical ad spend, ACoS, TACoS, keyword performance, and campaign structure."
      },
      {
        number: "02",
        title: "Keyword & Targeting Research",
        desc: "Build keyword lists covering exact-match terms, competitor ASINs, and search intent."
      },
      {
        number: "03",
        title: "Campaign Structure",
        desc: "Build isolated campaign structures for Sponsored Products, Brands, and Display."
      },
      {
        number: "04",
        title: "Launch & Monitoring",
        desc: "Deploy structured campaigns with negative targeting and daily performance tracking."
      },
      {
        number: "05",
        title: "Optimization & Reporting",
        desc: "Continuously adjust bids, harvest search terms, and provide transparent ROAS reports."
      }
    ]
  }
};

export default function AmazonConnectedWorkflow({ categorySlug }) {
  const data = workflows[categorySlug] || workflows["amazon-listing-images"];

  return (
    <div className="w-full my-16 relative z-10">
      {/* 1. CENTERED SECTION HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-16 px-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-extrabold uppercase tracking-widest mb-4 shadow-md">
          <Sparkles size={14} className="text-[#9D26FF]" />
          <span>{data.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-4">
          {data.heading}
        </h2>

        <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          {data.description}
        </p>
      </div>

      {/* 2. OPEN CONNECTED LINE WORKFLOW - DESKTOP (5 Horizontal Steps on Glowing Purple Line) */}
      <div className="hidden lg:block relative max-w-7xl mx-auto px-4 py-8">
        {/* Glowing Thicker Purple Connecting Line running through all 5 step circles */}
        <div className="absolute top-[64px] left-[7%] right-[7%] h-[3px] bg-gradient-to-r from-[#9D26FF]/25 via-[#9D26FF] to-[#9D26FF]/25 shadow-[0_0_15px_rgba(157,38,255,0.7)] z-0" />

        <div className="grid grid-cols-5 gap-6 sm:gap-8 relative z-10">
          {data.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Larger Numbered Circle (w-16 h-16) Sitting Directly ON the Connecting Line */}
              <div className="w-16 h-16 rounded-full bg-[var(--background)] border-[3px] border-[#9D26FF] shadow-xl shadow-[#9D26FF]/35 flex items-center justify-center text-base sm:text-lg font-black text-[#9D26FF] mb-6 group-hover:scale-110 group-hover:bg-[#9D26FF] group-hover:text-white transition-all duration-300 relative z-10">
                {step.number}
              </div>

              {/* Larger Step Title & Description Below Circle */}
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. OPEN CONNECTED LINE WORKFLOW - TABLET & MOBILE (Vertical Timeline with Left Connected Line) */}
      <div className="lg:hidden relative max-w-2xl mx-auto pl-10 sm:pl-12 space-y-8 px-4">
        {/* Left Glowing Vertical Line */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-5 w-[3px] bg-gradient-to-b from-[#9D26FF] via-[#9D26FF]/70 to-[#9D26FF]/20 shadow-[0_0_12px_rgba(157,38,255,0.6)] z-0" />

        {data.steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="relative group pl-3"
          >
            {/* Numbered Circle Node on Left Line */}
            <div className="absolute -left-10 sm:-left-12 top-0.5 w-9 h-9 rounded-full bg-[var(--background)] border-2 border-[#9D26FF] shadow-lg shadow-[#9D26FF]/30 flex items-center justify-center text-xs font-black text-[#9D26FF] z-10 group-hover:bg-[#9D26FF] group-hover:text-white transition-all">
              {step.number}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
