"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectShowcaseModal from "@/components/portfolio/ProjectShowcaseModal";

// ─── FILTER TABS ──────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "ppc", label: "PPC / Ad Management" },
  { id: "listing", label: "Listing Images & Creatives" },
  { id: "aplus", label: "A+ Content / Brand Store" },
  { id: "account", label: "Full Account Management" },
  { id: "webdev", label: "Website Development" },
  { id: "video", label: "Video Content" },
];

// ─── HERO STATS ───────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "$2M+", label: "Revenue Generated" },
  { value: "+64%", label: "Avg. Sales Growth" },
  { value: "181%→49%", label: "Best ACoS Reduction" },
  { value: "40+", label: "Brands Managed" },
];

// ─── FEATURED PPC (large bento hero tile) ────────────────────────────────────

const FEATURED_PPC = {
  id: "fp1",
  title: "Scaling to $46,487/month at 13.89% ACoS",
  client: "Amazon Brand Partner",
  tag: "PPC · AD MANAGEMENT",
  image: "/assets/service-amazon-ppc.png",
  metricValue: "$46K/mo",
  metricSub: "at 13.89% ACoS · 1,543 orders",
  result: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization.",
  problem: "Inefficient ad spend, high ACoS, poor keyword targeting, and inconsistent sales and profitability.",
  solution: "Full PPC campaign overhaul: restructured by separating high-converting keywords, implemented profit-driven bidding strategy, and leveraged peak season opportunities.",
};

// ─── LISTING IMAGES ───────────────────────────────────────────────────────────

const LISTING_IMAGES = [
  {
    id: "li1",
    title: "Nova Shampoo",
    client: "Nova Beauty",
    result: "CTR +64% after redesign",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725904601_gmv11.jpg",
    beforeImage: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725901546_va8bo.jpg",
    description: "A premium 7-image Amazon main stack with high-impact lifestyle imagery, infographic benefit callouts, ingredient highlights, and customer trust badges.",
    problem: "Low listing conversion rates due to plain product photos that failed to highlight key natural ingredients and hair nourishment benefits.",
    solution: "Designed 7-image Amazon main stack with high-impact lifestyle imagery, infographic benefit callouts, ingredient highlights, and customer trust badges.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786726066975_rb9oz.png",
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725904601_gmv11.jpg",
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725883425_focvl.jpg",
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725887393_o5p2t.jpg",
    ],
  },
  {
    id: "li2",
    title: "Avocado Hair & Skin Oil",
    client: "Organic Avocado Care",
    result: "Conversion doubled in 30 days",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786721788971_ktjnn.png",
    description: "Full visual storytelling suite featuring step-by-step application graphics, purity certifications, before/after texture shots, and premium packaging callouts.",
    problem: "Product was losing sales to competitors because buyers could not quickly understand the dual hair & skin application benefits.",
    solution: "Created application graphics, purity certifications, before/after texture shots, and premium packaging callouts.",
  },
  {
    id: "li3",
    title: "Anti-Hair Fall Shampoo",
    client: "Mamaearth Care",
    result: "+38% sessions after redesign",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786718471342_owd8n.jpg",
    description: "Photorealistic model lifestyle imagery with clear ingredient callouts (Rosemary & Biotin), clinical test proof points, and anti-hair fall benefit infographics.",
    problem: "Overcrowded hair care category with generic listings failing to communicate anti-hair fall efficacy.",
    solution: "Designed photorealistic model lifestyle imagery with Rosemary & Biotin callouts, clinical proof points, and benefit infographics.",
  },
  {
    id: "li4",
    title: "Whistling Tea Kettle",
    client: "Kitchen Craft",
    result: "2.3× CVR with premium renders",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641401585_reges.jpg",
    description: "Dark-mode luxury renders featuring steam dynamics, wood-grain texture closeups, stovetop compatibility infographics, and capacity measurements.",
    problem: "Kitchenware listing lacked premium luxury feel and failed to showcase heat resistance and ergonomic handle features.",
    solution: "Developed dark-mode luxury renders featuring steam dynamics, wood-grain texture closeups, stovetop compatibility infographics.",
  },
  {
    id: "li5",
    title: "Hand Grip Strengthener",
    client: "FitGrip Athletics",
    result: "−41% return rate via infographic",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786556525233_rp9g8.jpg",
    description: "High-contrast fitness infographics detailing 10-60kg tension settings, muscle targeting diagrams (forearms, wrist, fingers), and durability stress test visuals.",
    problem: "Customers were confused about dial resistance adjustment levels and ergonomic grip size.",
    solution: "Created high-contrast fitness infographics detailing 10-60kg tension settings and muscle targeting diagrams.",
  },
  {
    id: "li6",
    title: "Vitamin C Powder",
    client: "Pure Wellness",
    result: "+22% conversion with trust badges",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786557199885_c5scd.png",
    description: "Bright lifestyle imagery featuring drink mixing, scoop dosage callouts, immune defense benefit stack, and third-party lab testing badges.",
    problem: "Supplement listing had poor visual trust and failed to communicate solubility and daily immunity dosage.",
    solution: "Designed bright lifestyle imagery with drink mixing demos, dosage callouts, and third-party lab testing badges.",
  },
  {
    id: "li7",
    title: "Dry Body Brush",
    client: "SkinCare Essentials",
    result: "+3.1★ review sentiment shift",
    tag: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786625429845_kutez.jpg",
    description: "Natural aesthetic graphics showing bristle closeup, body routine diagram, copper wire anti-bacterial benefits, and eco packaging.",
    problem: "Skincare buyers needed clear evidence of bristle quality, ergonomic wood handle craft, and exfoliation routine guidance.",
    solution: "Designed natural aesthetic graphics showing bristle closeup, body routine diagram, copper wire benefits, and eco packaging.",
  },
];

// ─── PPC TILES ────────────────────────────────────────────────────────────────

const PPC_TILES = [
  {
    id: "ppc1",
    title: "ACoS: 181% → 49%",
    tag: "PPC · TURNAROUND",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
    client: "Amazon Brand Partner",
    metricValue: "−132%",
    metricSub: "ACoS in 5 months",
    result: "ACoS reduced from 181.43% to 49.07% in 5 months",
    problem: "ACoS of 181.43%, excessive ad spend, poor returns, weak campaign structure, limited organic growth, and inefficient bidding strategies.",
    solution: "Restructured campaigns by separating high-converting, testing, and exploratory keywords. Reallocated budget toward top-performing ads. Improved listings with A+ content.",
  },
  {
    id: "ppc2",
    title: "Scaling to $46K Monthly",
    tag: "PPC · SCALING",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
    client: "Amazon Brand Partner",
    metricValue: "$46K",
    metricSub: "at 13.89% ACoS",
    result: "$46,487.44 in a single month at 13.89% ACoS with 1,543 orders",
  },
  {
    id: "ppc3",
    title: "ACoS: 61% → 31%",
    tag: "PPC · OPTIMIZATION",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
    client: "Amazon Brand Partner",
    metricValue: "−30%",
    metricSub: "ACoS improvement",
    result: "ACoS reduced from 61.72% to 31.98% via multi-ad type strategy: Sponsored Products, Sponsored Brands & Sponsored Display.",
  },
  {
    id: "ppc4",
    title: "$100K+ Sales Period",
    tag: "PPC · GROWTH",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
    client: "Amazon Brand Partner",
    metricValue: "$100K+",
    metricSub: "with 1,621 units",
    result: "$100,471.43 in sales with 1,621 units ordered in selected period (up from $70,333.77)",
  },
];

// Text-only CTA tile for the empty bottom-right slot in the PPC grid
const PPC_CTA_TILE = {
  headline: "Ready to cut waste and scale?",
  body: "Every campaign we run is built around one goal — more profitable revenue. We audit, restructure, and scale Amazon PPC with data, not guesswork.",
  stat: "13.89%",
  statLabel: "Best ACoS achieved",
  cta: "See All PPC Results",
};

// ─── A+ CONTENT TILES ─────────────────────────────────────────────────────────

const APLUS_TILES = [
  {
    id: "ap1",
    title: "Nova Beauty Brand Store",
    tag: "A+ · BRAND STORE",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725887393_o5p2t.jpg",
    client: "Nova Beauty",
    metricValue: "+89%",
    metricSub: "repeat purchases",
    result: "Brand store launch drove +89% repeat purchase rate within 60 days",
  },
  {
    id: "ap2",
    title: "FitGrip A+ Content",
    tag: "A+ · CONTENT",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786556506876_g1cfr.jpg",
    client: "FitGrip Athletics",
    metricValue: "+47%",
    metricSub: "unit session rate",
    result: "Full A+ content redesign drove +47% unit session rate uplift",
  },
  {
    id: "ap3",
    title: "Pure Wellness Brand Story",
    tag: "A+ · BRAND STORY",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786557191724_ufapy.jpg",
    client: "Pure Wellness",
    metricValue: "+32%",
    metricSub: "glance views",
    result: "Enhanced A+ brand story drove +32% glance views and improved trust signals",
  },

];

// ─── ACCOUNT MANAGEMENT TILES ─────────────────────────────────────────────────

const ACCOUNT_TILES = [
  {
    id: "ac1",
    title: "Page 1 Ranking & Organic Growth",
    tag: "ACCOUNT · FULL MANAGEMENT",
    image: "/assets/hero-amazon.png",
    client: "Amazon Brand Partner",
    metricValue: "+240%",
    metricSub: "organic sessions",
    result: "Full account management drove product to page 1 ranking and +240% organic sessions",
  },
  {
    id: "ac2",
    title: "Brand Registry Resolution",
    tag: "ACCOUNT · BRAND PROTECTION",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733357398_hvysk.png",
    client: "Amazon Brand Partner",
    metricValue: "3 wks",
    metricSub: "brand registry secured",
    result: "Resolved Brand Registry complications and secured full brand protection in 3 weeks",
    problem: "Brand Registry enrollment complications, trademark verification issues, listing hijacker vulnerability.",
    solution: "Guided trademark process, corrected application errors, enrolled in Amazon Brand Protection tools.",
  },
  {
    id: "ac3",
    title: "Single SKU Rapid Launch",
    tag: "ACCOUNT · LAUNCH",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786651474009_a2hyn.png",
    client: "Amazon Brand Partner",
    metricValue: "$6.2K",
    metricSub: "in first 60 days",
    result: "$6,199 in sales in first 60 days on a brand-new single-SKU product on a limited budget",
  },
];

// ─── WEBSITE DEVELOPMENT TILES ────────────────────────────────────────────────

const WEBDEV_TILES = [
  {
    id: "wd1",
    title: "Shopify Fashion Storefront",
    tag: "WEB DEV · SHOPIFY",
    image: "/assets/webdev-shopify.png",
    client: "Fashion & Lifestyle Brand",
    metricValue: "+55%",
    metricSub: "checkout completion",
    result: "+55% checkout completion rate after full Shopify UX redesign and conversion optimisation",
    problem: "High cart abandonment rate and poor mobile checkout experience were costing the brand significant revenue.",
    solution: "Full Shopify theme redesign with streamlined one-page checkout, mobile-first product pages, and trust-signal optimisation.",
  },
  {
    id: "wd2",
    title: "Next.js SaaS Dashboard",
    tag: "WEB DEV · NEXT.JS",
    image: "/assets/webdev-nextjs.png",
    client: "SaaS Platform",
    metricValue: "3.8×",
    metricSub: "signup conversion lift",
    result: "3.8× organic signup conversion rate after Next.js portal rebuild with server-side rendering",
    problem: "Slow page loads and poor SEO were hurting organic acquisition for the SaaS platform.",
    solution: "Rebuilt the marketing site and dashboard in Next.js 14 with App Router, ISR, and optimised Core Web Vitals.",
  },
  {
    id: "wd3",
    title: "WooCommerce Brand Store",
    tag: "WEB DEV · WORDPRESS",
    image: "/assets/webdev-wordpress.png",
    client: "Consumer Brand",
    metricValue: "−48%",
    metricSub: "bounce rate",
    result: "−48% bounce rate after WordPress WooCommerce redesign and performance optimisation",
    problem: "Outdated WordPress theme with poor UX was driving visitors away before they reached the product pages.",
    solution: "Custom WooCommerce theme built on Elementor Pro with optimised images, lazy loading, and a redesigned shop flow.",
  },
];

// ─── VIDEO TILES ──────────────────────────────────────────────────────────────

const VIDEO_TILES = [
  {
    id: "v1",
    title: "Anker Soundcore Product Commercial",
    tag: "AMAZON VIDEO",
    thumbnail: "/assets/portfolio-video-v4.jpg",
    description: "High-energy Amazon video ad featuring active noise cancellation demo and ergonomic design highlights.",
    duration: "0:45",
    result: "+28% CTR on sponsored ads",
    metricValue: "+28%",
    metricSub: "CTR lift",
  },
  {
    id: "v2",
    title: "Derixio Corporate Brand Story",
    tag: "CORPORATE FILM",
    thumbnail: "/assets/real-video.jpg",
    description: "Behind-the-scenes brand documentary showcasing our team, creative process, and agency ethos.",
    duration: "1:30",
    result: "3× engagement vs static ads",
    metricValue: "3×",
    metricSub: "engagement uplift",
  },
  {
    id: "v3",
    title: "3D Kinetic Motion Graphics",
    tag: "MOTION GRAPHICS",
    thumbnail: "/assets/showcase-video-motion.png",
    description: "Sleek 3D particle motion graphics reveal for next-gen digital platforms and product launches.",
    duration: "0:30",
    result: "2.1× brand recall improvement",
    metricValue: "2.1×",
    metricSub: "brand recall",
  },
  {
    id: "v4",
    title: "Velox Smart Earbuds Explainer",
    tag: "3D ANIMATION",
    thumbnail: "/assets/user-video-motion.png",
    description: "Photorealistic 3D explode render revealing internal acoustic engineering and IPX7 waterproofing.",
    duration: "1:00",
    result: "−34% support ticket volume",
    metricValue: "−34%",
    metricSub: "support tickets",
  },
];

// ─── TRUST / RESULTS DATA ─────────────────────────────────────────────────────

const TRUST_STATS = [
  {
    id: "ts1",
    stat: "+64%",
    project: "Anker Innovations Storefront & PPC",
    category: "ECOMMERCE · AMAZON",
    description: "Revenue growth within 90 days of listing & campaign optimization",
  },
  {
    id: "ts2",
    stat: "3.8×",
    project: "Luminary Cloud Platform",
    category: "SAAS · WEB DEVELOPMENT",
    description: "Organic signup conversion rate lift after Next.js portal launch",
  },
  {
    id: "ts3",
    stat: "240%",
    project: "Velox Gear Rebrand & Packaging",
    category: "BRANDING · GRAPHIC DESIGN",
    description: "Increase in retail distribution sales following packaging redesign",
  },
];

// ─── SHARED SUB-COMPONENTS ────────────────────────────────────────────────────

function SectionHeader({ badge, title, description }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-sm">
          <Sparkles size={12} className="text-[#9D26FF]" />
          <span>{badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm text-[var(--foreground-muted)] max-w-xs leading-relaxed text-left sm:text-right">
          {description}
        </p>
      )}
    </div>
  );
}

// Large image tile: col-span-2 in 3-col grid
function LargeTile({ tile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="sm:col-span-2 lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group min-h-[380px] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
    >
      <Image
        src={tile.image}
        alt={tile.title}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Clean bottom-only gradient — image stays vivid, only the text area darkens */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "55%", background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.78) 100%)" }}
      />
      {/* Top-left badge pill */}
      <div className="absolute top-5 left-5">
        <span
          className="px-3 py-1.5 rounded-full text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg"
          style={{ background: "rgba(157,38,255,0.92)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          {tile.tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-5">{tile.title}</h3>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-5xl sm:text-6xl font-black text-[#9D26FF] leading-none tracking-tight" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {tile.metricValue}
            </div>
            <div className="text-xs text-white/60 mt-1.5">{tile.metricSub}</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#9D26FF] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Standard image tile: col-span-1
function SmallTile({ tile, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-3xl overflow-hidden cursor-pointer group min-h-[260px] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:-translate-y-1"
    >
      <Image
        src={tile.image}
        alt={tile.title}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Lighter bottom-only gradient — preserves image detail in the upper area */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "50%", background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.80) 100%)" }}
      />
      {/* Badge pill with semi-transparent purple fill instead of the old black/dark border pill */}
      <div className="absolute top-4 left-4">
        <span
          className="px-2.5 py-1 rounded-full text-white text-[9px] font-mono font-bold uppercase tracking-widest"
          style={{ background: "rgba(157,38,255,0.85)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {tile.tag}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-sm font-bold text-white mb-2 leading-snug">{tile.title}</h3>
        <div className="text-3xl font-black text-[#9D26FF] leading-none tracking-tight" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>
          {tile.metricValue}
        </div>
        <div className="text-[10px] text-white/50 mt-0.5">{tile.metricSub}</div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PortfolioV2() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedModal, setSelectedModal] = useState(null);
  const bentoCarouselRef = useRef(null);
  const listingCarouselRef = useRef(null);

  /* Open modal helper */
  const openModal = (tile) =>
    setSelectedModal({
      title: tile.title,
      categoryLabel: tile.tag || tile.categoryLabel || "",
      description: tile.result || tile.description || "",
      image: tile.image || tile.thumbnail || "",
      client: tile.client || "Amazon Brand Partner",
      problem: tile.problem,
      solution: tile.solution,
      gallery: tile.gallery,
    });

  /* Carousel scroll helper */
  const scrollCarousel = (ref, dir) => {
    if (!ref.current) return;
    const childWidth = ref.current.firstChild?.offsetWidth ?? 220;
    ref.current.scrollLeft += dir === "next" ? childWidth + 20 : -(childWidth + 20);
  };

  /* Show a section when filter is "all" or matches the section ID */
  const show = (id) => activeFilter === "all" || activeFilter === id;

  return (
    <section className="w-full relative isolate overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

      {/* ── Background atmosphere glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[#9D26FF]/6 rounded-full blur-[220px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="w-full pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-agenko-grid border-b border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
              <Sparkles size={13} />
              <span>Our Work</span>
            </div>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] text-center text-[var(--foreground-heading)] leading-[1.1] mb-5 tracking-tight">
            <span className="font-light">Every partner,</span>{" "}
            <span className="font-black text-[#9D26FF]">one growth story.</span>
          </h1>

          <p className="text-center text-[var(--foreground-muted)] text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            From Amazon PPC turnarounds to listing image transformations and full brand experiences — here is proof of what measurable growth looks like.
          </p>

          {/* ── STATS BAR ── */}
          {/* gap-px technique: parent bg shows through the 1px gaps as dividers */}
          <div className="max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--border)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
              {HERO_STATS.map((s, i) => (
                <div key={i} className="bg-[var(--card)] py-7 px-5 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#9D26FF] tracking-tight mb-1.5 leading-none">
                    {s.value}
                  </div>
                  <div className="text-xs text-[var(--foreground-muted)] font-medium tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                id={`portfolio2-filter-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${activeFilter === tab.id
                  ? "bg-[#9D26FF] text-white shadow-lg shadow-[#9D26FF]/25 scale-[1.03]"
                  : "bg-[var(--card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[#9D26FF] hover:text-[#9D26FF]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FEATURED BENTO GRID  (visible on "All" only)                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {activeFilter === "all" && (
          <motion.div
            key="featured-bento"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10"
          >
            <div className="max-w-7xl mx-auto">

              {/* Label */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="font-mono text-[11px] font-bold text-[var(--foreground-muted)] uppercase tracking-widest whitespace-nowrap">
                  Featured Case Studies
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              {/* ─ BENTO GRID ─ */}
              {/*
                Desktop 3-col layout (auto-placement handles row-span):
                  [large tile col-span-2 row-span-2] [stat tile 1]
                                                     [stat tile 2]
                  [quote 1]   [before/after]          [quote 2]
                  [listing carousel — col-span-3]
              */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* LARGE FEATURED TILE  (2 cols × 2 rows) */}
                <div
                  onClick={() => openModal(FEATURED_PPC)}
                  className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group min-h-[420px] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <Image
                    src={FEATURED_PPC.image}
                    alt={FEATURED_PPC.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full bg-[#9D26FF] text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                      {FEATURED_PPC.tag}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-white/40 text-[10px] font-mono mb-2">Client: {FEATURED_PPC.client}</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-5">
                      {FEATURED_PPC.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-6xl sm:text-7xl font-black text-[#9D26FF] leading-none tracking-tight drop-shadow-lg">
                          {FEATURED_PPC.metricValue}
                        </div>
                        <div className="text-sm text-white/50 mt-1.5">{FEATURED_PPC.metricSub}</div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#9D26FF] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STAT TILE 1 — ACoS Reduction */}
                <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-7 flex flex-col justify-between overflow-hidden group hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[210px]">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#9D26FF]/5 rounded-full -mr-10 -mt-10 group-hover:bg-[#9D26FF]/10 transition-colors duration-300 pointer-events-none" />
                  <span className="font-mono text-[10px] font-bold text-[#9D26FF] tracking-widest uppercase relative z-10">
                    ACoS Reduction
                  </span>
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-6xl font-black text-[#9D26FF] leading-none tracking-tight mb-2">
                      −132%
                    </div>
                    <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      181.43% → 49.07%<br />in 5 months
                    </div>
                  </div>
                </div>

                {/* STAT TILE 2 — Launch Revenue */}
                <div className="relative rounded-3xl bg-gradient-to-br from-[#9D26FF]/15 to-[#9D26FF]/4 border border-[#9D26FF]/25 p-7 flex flex-col justify-between overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[210px]">
                  <span className="font-mono text-[10px] font-bold text-[#9D26FF] tracking-widest uppercase">
                    Brand Launch Revenue
                  </span>
                  <div>
                    <div className="text-5xl sm:text-6xl font-black text-[var(--foreground-heading)] leading-none tracking-tight mb-2">
                      £54K
                    </div>
                    <div className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                      2,632 orders on<br />a limited budget
                    </div>
                  </div>
                </div>

                {/* QUOTE TILE 1 */}
                <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-7 flex flex-col justify-between hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[210px]">
                  <div className="text-4xl text-[#9D26FF] opacity-80 font-serif leading-none select-none mb-3">
                    ❝
                  </div>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed italic flex-1">
                    "Reduced our ACoS from 61% to 31% — the numbers speak for themselves. Best investment we made for our Amazon account."
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--foreground-muted)]">Amazon Brand Partner, Europe</span>
                    <span className="text-xs font-black text-[#9D26FF] font-mono ml-2 whitespace-nowrap">
                      ACoS −30%
                    </span>
                  </div>
                </div>

                {/* BEFORE / AFTER LISTING TILE */}
                <div
                  onClick={() => openModal(LISTING_IMAGES[0])}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:-translate-y-1 min-h-[210px]"
                >
                  {/* Split 50 / 50 */}
                  <div className="absolute inset-0 flex">
                    {/* Before */}
                    <div className="w-1/2 relative overflow-hidden">
                      <Image
                        src="/assets/portfolio/nova_before.jpeg"
                        alt="Before listing redesign"
                        fill
                        className="object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-mono font-bold text-white/60 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-full">
                          Before
                        </span>
                      </div>
                    </div>
                    {/* After */}
                    <div className="w-1/2 relative overflow-hidden border-l-2 border-[#9D26FF]">
                      <Image
                        src={LISTING_IMAGES[0].image}
                        alt="After listing redesign"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-mono font-bold text-[#9D26FF] uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded-full">
                          After ✦
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom result */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent pt-14">
                    <div className="text-xl font-black text-[#9D26FF] leading-none">CTR +64%</div>
                    <div className="text-[11px] text-white/50 mt-0.5">Nova Shampoo · listing redesign</div>
                  </div>
                </div>

                {/* QUOTE TILE 2 */}
                <div className="relative rounded-3xl bg-[var(--background-alt)] border border-[var(--border)] p-7 flex flex-col justify-between hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[210px]">
                  <div className="text-3xl text-[#9D26FF] opacity-60 font-serif leading-none select-none mb-3">
                    ❝
                  </div>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed italic flex-1">
                    "Launched and ranked on page 1 within 6 weeks. Exactly what we needed to compete in a crowded category."
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--foreground-muted)]">Amazon Brand Partner, UK</span>
                    <span className="text-xs font-black text-[#9D26FF] font-mono ml-2 whitespace-nowrap">
                      Page 1 in 6 wks
                    </span>
                  </div>
                </div>

                {/* FULL-WIDTH LISTING CAROUSEL */}
                <div className="lg:col-span-3 rounded-3xl bg-[var(--card)] border border-[var(--border)] p-6 sm:p-7 shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-1">
                        LISTING IMAGES &amp; CREATIVES
                      </span>
                      <h3 className="text-base font-bold text-[var(--foreground-heading)]">
                        7 product listing redesigns, each with a measured result
                      </h3>
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => scrollCarousel(bentoCarouselRef, "prev")}
                        aria-label="Scroll carousel left"
                        className="w-9 h-9 rounded-full bg-[var(--background-alt)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:border-[#9D26FF] hover:text-[#9D26FF] transition-all cursor-pointer"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        onClick={() => scrollCarousel(bentoCarouselRef, "next")}
                        aria-label="Scroll carousel right"
                        className="w-9 h-9 rounded-full bg-[var(--background-alt)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:border-[#9D26FF] hover:text-[#9D26FF] transition-all cursor-pointer"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={bentoCarouselRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1"
                  >
                    {LISTING_IMAGES.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openModal(item)}
                        className="flex-shrink-0 w-40 sm:w-48 lg:w-52 cursor-pointer group"
                      >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--background-alt)] border border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-300 shadow-md">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="208px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="text-[10px] font-bold text-[#9D26FF] font-mono leading-snug">
                              {item.result}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2.5 px-0.5">
                          <div className="text-xs font-bold text-[var(--foreground-heading)] truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">
                            {item.client}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* PPC / AD MANAGEMENT SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("ppc") && (
        <motion.div
          key="ppc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="PPC · Ad Management"
              title="Ad campaigns that cut waste and scale revenue"
              description="Data-driven ad management that reduces ACoS and scales profitable Amazon revenue — with numbers to prove it."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <LargeTile tile={PPC_TILES[0]} onClick={() => openModal(PPC_TILES[0])} />
              {PPC_TILES.slice(1).map((tile) => (
                <SmallTile key={tile.id} tile={tile} onClick={() => openModal(tile)} />
              ))}

              {/* Text-only CTA card — fills the empty bottom-right grid slot */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#9D26FF]/14 via-[var(--card)] to-[var(--card)] border border-[#9D26FF]/25 p-7 flex flex-col justify-between overflow-hidden hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[260px] group">
                {/* Decorative glow blob */}
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-[#9D26FF]/10 blur-2xl pointer-events-none group-hover:bg-[#9D26FF]/18 transition-colors duration-500" />

                <div className="relative z-10">
                  <span className="font-mono text-[9px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-3">PPC · DATA</span>
                  <h3 className="text-base font-extrabold text-[var(--foreground-heading)] leading-snug mb-3">
                    {PPC_CTA_TILE.headline}
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {PPC_CTA_TILE.body}
                  </p>
                </div>

                <div className="relative z-10 mt-5">
                  {/* Inline stat */}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-black text-[#9D26FF] leading-none tracking-tight">{PPC_CTA_TILE.stat}</span>
                    <span className="text-[10px] text-[var(--foreground-muted)] mb-1 leading-tight">{PPC_CTA_TILE.statLabel}</span>
                  </div>
                  {/* Divider */}
                  <div className="h-px w-full bg-[var(--border)] mb-4" />
                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9D26FF]">{PPC_CTA_TILE.cta}</span>
                    <div className="w-8 h-8 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* LISTING IMAGES & CREATIVES SECTION                                    */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("listing") && (
        <motion.div
          key="listing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10 bg-[var(--background-alt)]"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="Listing Images & Creatives"
              title="Conversion-focused listing images"
              description="Visual storytelling that communicates value before the first click — driving higher CTR and conversion rates."
            />

            {activeFilter === "listing" ? (
              /* Standalone: full 4-col grid with result overlays */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {LISTING_IMAGES.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openModal(item)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-300 shadow-lg hover:-translate-y-1">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-xs font-black text-[#9D26FF] mb-1 leading-snug">
                          {item.result}
                        </div>
                        <div className="text-[10px] text-white/50">{item.client}</div>
                      </div>
                    </div>
                    <div className="mt-2.5 px-0.5">
                      <div className="text-xs font-bold text-[var(--foreground-heading)]">
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* In "All" view: compact horizontal carousel */
              <div>
                <div className="flex justify-end gap-2 mb-5">
                  <button
                    onClick={() => scrollCarousel(listingCarouselRef, "prev")}
                    aria-label="Previous listing images"
                    className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:border-[#9D26FF] hover:text-[#9D26FF] transition-all cursor-pointer"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() => scrollCarousel(listingCarouselRef, "next")}
                    aria-label="Next listing images"
                    className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:border-[#9D26FF] hover:text-[#9D26FF] transition-all cursor-pointer"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
                <div
                  ref={listingCarouselRef}
                  className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth"
                >
                  {LISTING_IMAGES.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openModal(item)}
                      className="flex-shrink-0 w-48 sm:w-56 lg:w-64 cursor-pointer group"
                    >
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border)] group-hover:border-[#9D26FF] transition-all duration-300 shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="256px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="text-[11px] font-bold text-[#9D26FF] font-mono">
                            {item.result}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 px-0.5">
                        <div className="text-xs font-bold text-[var(--foreground-heading)] truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">
                          {item.client}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* A+ CONTENT / BRAND STORE SECTION                                      */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("aplus") && (
        <motion.div
          key="aplus"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="A+ Content · Brand Store"
              title="Brand content that drives repeat revenue"
              description="Enhanced brand content and storefronts that build trust, increase glance views, and drive repeat purchases."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {APLUS_TILES.map((tile) => (
                <div
                  key={tile.id}
                  onClick={() => openModal(tile)}
                  className="rounded-3xl overflow-hidden cursor-pointer group border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:-translate-y-1 bg-[var(--card)] flex flex-col"
                >
                  {/* Image — clean 4:3, zero overlay, full visibility */}
                  <div className="relative w-full aspect-[3/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>

                  {/* Text body — completely outside the image */}
                  <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
                    <p className="text-[10px] text-[var(--foreground-muted)] font-mono mb-0.5">{tile.client}</p>
                    <h3 className="text-sm font-bold text-[var(--foreground-heading)] leading-snug group-hover:text-[#9D26FF] transition-colors mb-auto">
                      {tile.title}
                    </h3>
                    <div className="flex items-end justify-between pt-4 mt-3 border-t border-[var(--border)]">
                      <div>
                        <div className="text-3xl font-black text-[#9D26FF] leading-none tracking-tight">
                          {tile.metricValue}
                        </div>
                        <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{tile.metricSub}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FULL ACCOUNT MANAGEMENT SECTION                                       */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("account") && (
        <motion.div
          key="account"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10 bg-[var(--background-alt)]"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="Full Account Management"
              title="End-to-end Amazon management"
              description="From launch to ranking, brand protection to sustained growth — complete Amazon account ownership."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* ROW 1 — Text intro card (left) + Large tile (right, col-span-2) */}

              {/* Text card 1 — top-left */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#9D26FF]/14 via-[var(--card)] to-[var(--card)] border border-[#9D26FF]/25 p-7 flex flex-col justify-between overflow-hidden hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[260px] group">
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-[#9D26FF]/10 blur-2xl pointer-events-none group-hover:bg-[#9D26FF]/18 transition-colors duration-500" />
                <div className="relative z-10">
                  <span className="font-mono text-[9px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-3">ACCOUNT · SERVICE</span>
                  <h3 className="text-base font-extrabold text-[var(--foreground-heading)] leading-snug mb-3">
                    Full ownership. Real outcomes.
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    We manage listings, PPC, inventory, brand protection, and growth strategy — so you can focus on your product while we handle Amazon end-to-end.
                  </p>
                </div>
                <div className="relative z-10 mt-5">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-black text-[#9D26FF] leading-none tracking-tight">40+</span>
                    <span className="text-[10px] text-[var(--foreground-muted)] mb-1 leading-tight">Amazon brands fully managed</span>
                  </div>
                  <div className="h-px w-full bg-[var(--border)] mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9D26FF]">End-to-end management</span>
                    <div className="w-8 h-8 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Large image tile — right, spans 2 cols */}
              <LargeTile tile={ACCOUNT_TILES[0]} onClick={() => openModal(ACCOUNT_TILES[0])} />

              {/* ROW 2 — Brand Registry small tile + SKU Launch small tile + Text stat card */}
              <SmallTile tile={ACCOUNT_TILES[1]} onClick={() => openModal(ACCOUNT_TILES[1])} />
              <SmallTile tile={ACCOUNT_TILES[2]} onClick={() => openModal(ACCOUNT_TILES[2])} />

              {/* Text card 2 — bottom-right stat highlight */}
              <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-7 flex flex-col justify-between overflow-hidden hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[260px] group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D26FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-mono text-[9px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-3">ACCOUNT · GROWTH</span>
                  <h3 className="text-sm font-extrabold text-[var(--foreground-heading)] leading-snug mb-2">
                    From launch to page 1 — we've done it on every budget.
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    Brand registry resolved in 3 weeks. New SKU generating sales in 60 days. Page 1 ranking with +240% organic growth.
                  </p>
                </div>
                <div className="relative z-10 mt-5">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-black text-[#9D26FF] leading-none tracking-tight">£54K</span>
                    <span className="text-[10px] text-[var(--foreground-muted)] mb-1 leading-tight">new brand on limited budget</span>
                  </div>
                  <div className="h-px w-full bg-[var(--border)] mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9D26FF]">See all account results</span>
                    <div className="w-8 h-8 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF] flex items-center justify-center group-hover:bg-[#9D26FF] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* WEBSITE DEVELOPMENT SECTION                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("webdev") && (
        <motion.div
          key="webdev"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="Website Development"
              title="Storefronts & platforms built to sell"
              description="Next.js, Shopify & WordPress builds — performance-first, conversion-optimised, and tailored to your stack."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* ROW 1 — Text intro card (left) + Large tile (right, col-span-2) */}

              {/* Text card 1 — top-left: platform list */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#9D26FF]/14 via-[var(--card)] to-[var(--card)] border border-[#9D26FF]/25 p-7 flex flex-col justify-between overflow-hidden hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[260px] group">
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-[#9D26FF]/10 blur-2xl pointer-events-none group-hover:bg-[#9D26FF]/18 transition-colors duration-500" />
                <div className="relative z-10">
                  <span className="font-mono text-[9px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-3">WEB DEV · PLATFORMS</span>
                  <h3 className="text-base font-extrabold text-[var(--foreground-heading)] leading-snug mb-3">
                    One agency. Every stack.
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed mb-4">
                    Whether you need a blazing-fast Shopify store, a custom Next.js app, or a powerful WordPress site — we build it right the first time.
                  </p>
                  {/* Platform badges */}
                  <div className="flex flex-wrap gap-2">
                    {["Shopify", "Next.js", "WordPress", "WooCommerce"].map((p) => (
                      <span key={p} className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-[#9D26FF] border border-[#9D26FF]/30 bg-[#9D26FF]/8 tracking-wider">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 mt-5">
                  <div className="h-px w-full bg-[var(--border)] mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9D26FF]">Multi-platform delivery</span>
                    <div className="w-8 h-8 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Large image tile — Shopify (right, spans 2 cols) */}
              <LargeTile tile={WEBDEV_TILES[0]} onClick={() => openModal(WEBDEV_TILES[0])} />

              {/* ROW 2 — Next.js small tile + WordPress small tile + Text stat card */}
              <SmallTile tile={WEBDEV_TILES[1]} onClick={() => openModal(WEBDEV_TILES[1])} />
              <SmallTile tile={WEBDEV_TILES[2]} onClick={() => openModal(WEBDEV_TILES[2])} />

              {/* Text stat card — bottom-right */}
              <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-7 flex flex-col justify-between overflow-hidden hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg min-h-[260px] group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D26FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-mono text-[9px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-3">WEB DEV · RESULTS</span>
                  <h3 className="text-sm font-extrabold text-[var(--foreground-heading)] leading-snug mb-2">
                    Fast sites. Lower bounce. More sales.
                  </h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    Every build is optimised for Core Web Vitals, mobile-first UX, and conversion — not just looks.
                  </p>
                </div>
                <div className="relative z-10 mt-5">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-black text-[#9D26FF] leading-none tracking-tight">3.8×</span>
                    <span className="text-[10px] text-[var(--foreground-muted)] mb-1 leading-tight">avg. conversion lift across builds</span>
                  </div>
                  <div className="h-px w-full bg-[var(--border)] mb-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9D26FF]">See all web projects</span>
                    <div className="w-8 h-8 rounded-full bg-[#9D26FF]/10 border border-[#9D26FF]/30 text-[#9D26FF] flex items-center justify-center group-hover:bg-[#9D26FF] group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* VIDEO CONTENT SECTION                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {show("video") && (
        <motion.div
          key="video"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10 bg-[var(--background-alt)]"
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              badge="Video Content"
              title="See the creative work in motion"
              description="Product commercials, brand films, and 3D animation that drive higher engagement across every channel."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VIDEO_TILES.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() =>
                    setSelectedModal({
                      title: vid.title,
                      categoryLabel: vid.tag,
                      description: `${vid.description} — Result: ${vid.result}`,
                      image: vid.thumbnail,
                      mediaType: "video",
                    })
                  }
                  className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {/* Thumbnail + play */}
                  <div className="relative aspect-video">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#9D26FF] text-white flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <Play size={22} className="ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 font-mono text-[10px] bg-black/80 text-white px-2 py-0.5 rounded border border-white/10 font-bold">
                      {vid.duration}
                    </div>

                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#9D26FF]/90 text-white text-[9px] font-mono font-bold uppercase tracking-widest">
                        {vid.tag}
                      </span>
                    </div>
                  </div>

                  {/* Info card */}
                  <div className="p-5 bg-[var(--card)]">
                    <h3 className="text-base font-bold text-[var(--foreground-heading)] mb-1.5">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground-muted)] mb-3 line-clamp-2">
                      {vid.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-[#9D26FF] font-mono">{vid.result}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-[#9D26FF] opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* TRUST / RESULTS SECTION  (always visible — mid-page, not just bottom) */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles size={12} />
              <span>Proven Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground-heading)] tracking-tight mb-3">
              Results behind the work
            </h2>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed">
              Verified ROI and measurable growth delivered for real clients across Amazon, web development, and brand design.
            </p>
          </div>

          {/* Bento: 3 stat cards (each 1 col) + 1 large quote (2 cols) in 5-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
            {TRUST_STATS.map((s) => (
              <div
                key={s.id}
                className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-7 flex flex-col justify-between hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D26FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-mono text-[10px] font-bold text-[#9D26FF] tracking-widest uppercase block mb-2">
                    {s.category}
                  </span>
                  <div className="text-5xl sm:text-6xl font-black text-[#9D26FF] tracking-tight leading-none mb-4">
                    {s.stat}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground-heading)] mb-2">{s.project}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}

            {/* Large quote tile — takes 2 cols on large screens */}
            <div className="sm:col-span-2 lg:col-span-2 relative rounded-3xl bg-[var(--background-alt)] border border-[var(--border)] p-7 sm:p-8 flex flex-col justify-between hover:border-[#9D26FF] hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <div className="text-4xl text-[#9D26FF] opacity-70 font-serif leading-none select-none mb-5">❝</div>
              <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed italic flex-1 mb-6">
                "Reduced our ACoS from 61% to 31% — we were skeptical at first but the results don't lie. Best investment we've made for our Amazon account this year."
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-[var(--border)]">
                <div>
                  <div className="text-sm font-bold text-[var(--foreground-heading)]">
                    Amazon Brand Partner
                  </div>
                  <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                    Europe · Health &amp; Beauty
                  </div>
                </div>
                <span className="text-sm font-black text-[#9D26FF] font-mono bg-[#9D26FF]/10 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                  ACoS: 61% → 31%
                </span>
              </div>
            </div>
          </div>

          {/* Second client quote — full-width bar */}
          <div className="rounded-3xl bg-gradient-to-r from-[#9D26FF]/10 via-[var(--card)] to-[var(--card)] border border-[#9D26FF]/20 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-lg hover:border-[#9D26FF]/40 transition-all duration-300 hover:-translate-y-0.5">
            <div className="text-3xl text-[#9D26FF] opacity-60 font-serif leading-none select-none flex-shrink-0">❝</div>
            <div className="flex-1">
              <p className="text-base text-[var(--foreground)] leading-relaxed italic mb-3">
                "Launched and ranked on page 1 within 6 weeks. The listing image design and PPC setup was exactly what we needed to compete in a crowded category."
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-[var(--foreground-heading)]">
                  Amazon Brand Partner · UK
                </span>
                <span className="text-xs font-black text-[#9D26FF] font-mono bg-[#9D26FF]/10 px-2.5 py-0.5 rounded-full">
                  Page 1 in 6 weeks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* CLOSING CTA                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#9D26FF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-agenko-grid opacity-25 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={12} />
            <span>Ready to grow?</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-[1.1] mb-5">
            Let&apos;s build your
            <br />
            <span className="text-[#9D26FF]">growth story.</span>
          </h2>

          <p className="text-[var(--foreground-muted)] text-base sm:text-lg mb-10 leading-relaxed">
            Free audit call · No lock-in contracts · Results you can measure
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              id="portfolio2-cta-audit"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#9D26FF] text-white text-sm font-bold hover:bg-[#8500ED] transition-all duration-300 shadow-xl hover:shadow-[#9D26FF]/30 hover:-translate-y-0.5 active:scale-95"
            >
              Book a free audit
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
            <Link
              href="/plans"
              id="portfolio2-cta-plans"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-heading)] text-sm font-bold hover:border-[#9D26FF] hover:text-[#9D26FF] transition-all duration-300"
            >
              See our plans
            </Link>
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      <ProjectShowcaseModal
        project={selectedModal}
        isOpen={Boolean(selectedModal)}
        onClose={() => setSelectedModal(null)}
      />
    </section>
  );
}
