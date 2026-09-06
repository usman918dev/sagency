"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProjectShowcaseModal from "@/components/portfolio/ProjectShowcaseModal";

// ─── 6 instant-render fallback items ────────────────────────────────────────
const FALLBACK = [
  {
    id: "proj_1786726176540_6nd61",
    title: "Nova Shampoo Listing Images",
    categoryLabel: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786726066975_rb9oz.png",
    client: "Nova Beauty",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-listing-images",
    description: "A premium Amazon listing image set designed to showcase the product's benefits, ingredients, and key features.",
    problem: "Low listing conversion rates due to plain product photos.",
    solution: "Designed 7-image Amazon main stack with high-impact lifestyle imagery and benefit callouts.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786726066975_rb9oz.png",
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786725904601_gmv11.jpg",
    ],
  },
  {
    id: "proj_1786721837342_oh9ah",
    title: "Avocado Hair & Skin Oil Listing Images",
    categoryLabel: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786721788971_ktjnn.png",
    client: "Organic Avocado Care",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-listing-images",
    description: "Full visual storytelling suite for organic avocado hair & skin oil.",
    problem: "Buyers couldn't understand the dual hair & skin application benefits.",
    solution: "Created step-by-step application graphics, purity certifications, and premium packaging callouts.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786721788971_ktjnn.png",
    ],
  },
  {
    id: "proj_1786718660672_tyojs",
    title: "Anti-Hair Fall Shampoo Listing Images",
    categoryLabel: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786718471342_owd8n.jpg",
    client: "Mamaearth Care",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-listing-images",
    description: "Premium Amazon listing cover featuring lifestyle visuals and bold feature callouts.",
    problem: "Generic listings in an overcrowded hair care category.",
    solution: "Photorealistic model lifestyle imagery with Rosemary & Biotin ingredient callouts.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786718471342_owd8n.jpg",
    ],
  },
  {
    id: "proj_1786557262274_g8hz3",
    title: "Vitamin C Powder Listing Images",
    categoryLabel: "AMAZON · LISTING IMAGES",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786557199885_c5scd.png",
    client: "Pure Wellness",
    categorySlug: "amazon-growth",
    subCategorySlug: "amazon-listing-images",
    description: "Clean, premium Amazon listing image set with bright, natural visuals.",
    problem: "Poor visual trust and failed to communicate solubility and dosage.",
    solution: "Bright lifestyle imagery featuring drink mixing, dosage callouts, and lab testing badges.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786557199885_c5scd.png",
    ],
  },
  {
    id: "proj_1786556851498_1423e",
    title: "Hand Grip Strengthener Listing Images",
    categoryLabel: "AMAZON · A+ CONTENT",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786556525233_rp9g8.jpg",
    client: "FitGrip Athletics",
    categorySlug: "amazon-growth",
    subCategorySlug: "a-plus-content",
    description: "Professional Amazon listing image set showcasing the adjustable hand grip strengthener.",
    problem: "Customers confused about dial resistance adjustment levels and ergonomic grip size.",
    solution: "High-contrast fitness infographics detailing tension settings and muscle targeting diagrams.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786556525233_rp9g8.jpg",
    ],
  },
  {
    id: "proj_1786641570447_m33wd",
    title: "Whistling Tea Kettle Listing Images",
    categoryLabel: "AMAZON · A+ CONTENT",
    image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641401585_reges.jpg",
    client: "Kitchen Craft",
    categorySlug: "amazon-growth",
    subCategorySlug: "a-plus-content",
    description: "Premium cinematic product listing highlighting elegant form and wood-grain detailing.",
    problem: "Kitchenware listing lacked premium feel and failed to showcase heat resistance.",
    solution: "Dark-mode luxury renders featuring steam dynamics and stovetop compatibility infographics.",
    gallery: [
      "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641401585_reges.jpg",
    ],
  },
];

// ─── DB → display shape mapper ───────────────────────────────────────────────
function mapDbProject(p, i) {
  const service = (p.service || "").toLowerCase();
  let categorySlug = p.categorySlug || p.subCategory || "graphic-designing";

  if (service.includes("amazon") || categorySlug.startsWith("amazon") || categorySlug === "a-plus-content" || categorySlug === "amazon-brand-store") {
    categorySlug = "amazon-growth";
  } else if (service.includes("web") || categorySlug === "web-development") {
    categorySlug = "web-development";
  } else if (service.includes("seo") || categorySlug === "seo") {
    categorySlug = "seo";
  } else if (service.includes("digital marketing") || categorySlug === "digital-marketing") {
    categorySlug = "digital-marketing";
  } else if (service.includes("video") || service.includes("motion")) {
    categorySlug = "video-editing";
  } else if (service.includes("graphic") || ["logo-brand-identity", "ui-ux-design", "packaging-print-design", "social-media-ad-creatives", "3d-product-design-mockups", "shopify-store-web-graphics"].includes(categorySlug)) {
    categorySlug = "graphic-designing";
  }

  const rawSub = (p.subCategory || p.categorySlug || "").toLowerCase().trim();
  const SUB_LABEL_MAP = {
    "amazon-listing-images": "AMAZON · LISTING IMAGES",
    "a-plus-content": "AMAZON · A+ CONTENT",
    "amazon-brand-store": "AMAZON · BRAND STORE",
    "amazon-ppc": "AMAZON · PPC",
    "3d-product-design-mockups": "GRAPHIC · 3D MOCKUPS",
    "shopify-store-web-graphics": "GRAPHIC · SHOPIFY",
    "logo-brand-identity": "GRAPHIC · LOGO & BRAND",
    "social-media-ad-creatives": "GRAPHIC · SOCIAL MEDIA",
    "packaging-print-design": "GRAPHIC · PACKAGING",
    "ui-ux-design": "GRAPHIC · UI/UX",
    "social-media-video-editing": "VIDEO · SOCIAL MEDIA",
    "ad-creative-videos": "VIDEO · AD CREATIVES",
    "motion-graphics": "VIDEO · MOTION",
    "brand-promotional-videos": "VIDEO · BRAND",
    "amazon-video-editing": "VIDEO · AMAZON",
    "web-development": "WEB DEVELOPMENT",
    "seo": "SEO",
    "digital-marketing": "DIGITAL MARKETING",
  };
  const categoryLabel = SUB_LABEL_MAP[rawSub] || (p.service || "PORTFOLIO").toUpperCase();

  const mediaItems = Array.isArray(p.mediaItems) ? p.mediaItems : [];
  const gallery = mediaItems.length > 0
    ? mediaItems.map((m) => m.url).filter(Boolean)
    : Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [];
  const coverImage = p.coverImage || p.image || gallery[0] || "/assets/portfolio-web-v4.jpg";

  return {
    id: p.id,
    title: p.title,
    categorySlug,
    subCategorySlug: rawSub,
    categoryLabel,
    image: coverImage,
    client: p.client || p.brandName || "",
    description: p.description || "",
    problem: p.problem || p.caseStudyData || "",
    solution: p.solution || "",
    gallery,
  };
}

// ─── Individual bento card ───────────────────────────────────────────────────
function BentoCard({ item, index, onClick }) {
  const isBig = index === 0;

  return (
    <motion.div
      key={item.id}
      className={[
        "relative overflow-hidden rounded-2xl cursor-pointer group",
        // Mobile/tablet: fixed aspect ratio
        "aspect-[4/3]",
        // Desktop bento positions
        "lg:aspect-auto",
        isBig ? "lg:col-span-2 lg:row-span-2" : "",
      ].join(" ")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      onClick={onClick}
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes={isBig
          ? "(max-width: 1024px) 100vw, 66vw"
          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Dark gradient — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* Purple hover tint */}
      <div className="absolute inset-0 bg-[#9D26FF]/0 group-hover:bg-[#9D26FF]/12 transition-colors duration-300" />

      {/* Top-left category pill */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
        <span className="inline-flex items-center font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-[5px] rounded-full bg-[#9D26FF]/90 text-white border border-white/15 backdrop-blur-sm shadow-lg whitespace-nowrap">
          {item.categoryLabel}
        </span>
      </div>

      {/* Top-right arrow — appears on hover */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-xl">
          <ArrowUpRight size={15} className="text-[#9D26FF]" />
        </div>
      </div>

      {/* Bottom: title + client */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
        <h3
          className={[
            "font-bold text-white leading-snug mb-0.5",
            isBig ? "text-lg sm:text-xl md:text-2xl" : "text-sm sm:text-[15px]",
          ].join(" ")}
        >
          {item.title}
        </h3>
        {item.client && (
          <p className="text-white/60 text-[10px] sm:text-xs font-medium tracking-wide">
            {item.client}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function HomePortfolio() {
  const [items, setItems] = useState(FALLBACK);
  const [modal, setModal] = useState(null);

  // Background fetch — cards show instantly via FALLBACK, live data swaps in silently
  useEffect(() => {
    fetch("/api/portfolio/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data
            .filter((p) => p.status !== "Hidden" && p.published !== false && !p.deleted)
            .map(mapDbProject);
          if (mapped.length > 0) setItems(mapped);
        }
      })
      .catch(() => {}); // silent fallback
  }, []);

  const display = items.slice(0, 6);

  return (
    <section className="w-full relative py-20 sm:py-28 bg-[var(--background)] bg-agenko-grid overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9D26FF]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="g-px relative z-10">
        {/* ── Section header ──────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>OUR WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[var(--foreground-heading)] leading-tight mb-4 tracking-tight">
            <span className="font-light">Every service, </span>
            <span className="font-extrabold text-[#9D26FF]">one growth story.</span>
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto">
            From Amazon listing transformations to full-scale digital platforms — explore how we accelerate multi-channel growth.
          </p>
        </motion.div>

        {/* ── Bento grid ──────────────────────────────────────────── */}
        {/*
          Mobile  (< sm) : 1 column — all cards stack with 4:3 aspect ratio
          Tablet  (sm-lg) : 2 columns — equal grid, all cards 4:3
          Desktop (lg+)   : 3 columns, auto-rows 260px
                            Card 0 → col-span-2, row-span-2 (large hero)
                            Cards 1-2 → right column, stacked
                            Cards 3-5 → full-width bottom row
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:[grid-auto-rows:260px]"
        >
          {display.map((item, i) => (
            <BentoCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setModal(item)}
            />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <motion.div
          className="mt-12 sm:mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#9D26FF] text-white text-sm font-bold hover:bg-[#8500ED] transition-all duration-300 shadow-lg hover:shadow-purple-900/40 hover:-translate-y-0.5 group"
          >
            View All {items.length}+ Projects
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectShowcaseModal
        project={modal}
        isOpen={Boolean(modal)}
        onClose={() => setModal(null)}
      />
    </section>
  );
}
