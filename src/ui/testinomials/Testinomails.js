"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Building,
  Calendar,
  Users,
  Play,
  Pause,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   STATISTICS — static, never change unless user requests
   ═══════════════════════════════════════════════════════════════════ */
const STATS = [
  { value: "99%",  label: "Client Retention" },
  { value: "5.0",  label: "Average Rating" },
  { value: "150+", label: "Happy Clients" },
  { value: "96%",  label: "Project Success Rate" },
];

/* ═══════════════════════════════════════════════════════════════════
   AUTO-PLAY INTERVAL
   ═══════════════════════════════════════════════════════════════════ */
const AUTOPLAY_MS = 5000;

/* ═══════════════════════════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════════════════════════ */
function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400/40 fill-gray-400/40"
          }
        />
      ))}
      <span className="text-[var(--foreground-muted)] text-sm font-semibold ml-1">
        {Number(rating).toFixed(1)} out of 5
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CLIENT AVATAR — real image or initials fallback
   ═══════════════════════════════════════════════════════════════════ */
function ClientAvatar({ imageUrl, name }) {
  const initials = (name || "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex-shrink-0">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#9D26FF] ring-offset-2 ring-offset-[var(--card)]"
        style={{ minWidth: 56, minHeight: 56 }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name || "Client"}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            unoptimized={imageUrl.includes("supabase.co")}
          />
        ) : (
          <div className="w-full h-full bg-[#9D26FF] flex items-center justify-center text-white font-bold text-lg">
            {initials || <Users size={20} />}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIAL CARD (left panel content with smooth animation)
   ═══════════════════════════════════════════════════════════════════ */
function TestimonialCard({ testimonial, direction = 1 }) {
  const deliverablesList =
    typeof testimonial.deliverables === "string" && testimonial.deliverables.trim()
      ? testimonial.deliverables.split("\n").filter(Boolean)
      : Array.isArray(testimonial.results)
      ? testimonial.results
      : [];

  const name     = testimonial.clientName || testimonial.name || "";
  const role     = testimonial.role || testimonial.position || "";
  const company  = testimonial.company || "";
  const text     = testimonial.reviewText || testimonial.text || "";
  const service  = testimonial.service || testimonial.project || "";
  const date     = testimonial.projectDate || testimonial.date || "";
  const rating   = testimonial.rating || 5;
  const imageUrl = testimonial.imageUrl || testimonial.image || "";

  const variants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {/* Quote icon with subtle pulse */}
      <motion.div
        initial={{ opacity: 0.7, scale: 0.95 }}
        animate={{ opacity: [0.7, 0.9, 0.7], scale: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-[#9D26FF] mb-5"
      >
        <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
          <path
            d="M0 32V19.2C0 14.4 1.06667 10.2667 3.2 6.8C5.33333 3.2 8.66667 0.533333 13.2 0L15.2 3.6C11.6 4.4 8.93333 6 7.2 8.4C5.6 10.8 4.8 13.6 4.8 16.8H12V32H0ZM22.8 32V19.2C22.8 14.4 23.8667 10.2667 26 6.8C28.1333 3.2 31.4667 0.533333 36 0L38 3.6C34.4 4.4 31.7333 6 30 8.4C28.4 10.8 27.6 13.6 27.6 16.8H34.8V32H22.8Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Stars */}
      <div className="mb-5">
        <StarRating rating={rating} />
      </div>

      {/* Review text */}
      <blockquote className="text-[var(--foreground-heading)] text-base sm:text-lg leading-relaxed font-medium mb-6">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Key Deliverables */}
      {deliverablesList.length > 0 && (
        <div className="mb-5">
          <p className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-2.5">
            Key Deliverables:
          </p>
          <ul className="flex flex-col gap-1.5">
            {deliverablesList.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-2 text-[var(--foreground-muted)] text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9D26FF] flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Service + Date tags */}
      {(service || date) && (
        <div className="flex items-center gap-3 flex-wrap mb-6">
          {service && (
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-1.5 text-[var(--foreground-muted)] text-xs border border-[var(--border)] rounded-md px-2.5 py-1 bg-[var(--background-alt)]"
            >
              <Building size={11} className="text-[#9D26FF]" />
              {service}
            </motion.div>
          )}
          {date && (
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-1.5 text-[var(--foreground-muted)] text-xs border border-[var(--border)] rounded-md px-2.5 py-1 bg-[var(--background-alt)]"
            >
              <Calendar size={11} className="text-[#9D26FF]" />
              {date}
            </motion.div>
          )}
        </div>
      )}

      {/* Client info */}
      <div className="flex items-center gap-3.5">
        <ClientAvatar imageUrl={imageUrl} name={name} />
        <div>
          <div className="text-[var(--foreground-heading)] font-bold text-sm sm:text-base">{name}</div>
          {(role || company) && (
            <div className="text-[var(--foreground-muted)] text-xs sm:text-sm mt-0.5">
              {role}
              {role && company ? " at " : ""}
              {company}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STAT CARD with subtle micro-interaction
   ═══════════════════════════════════════════════════════════════════ */
function StatCard({ value, label }) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: "rgba(157, 38, 255, 0.5)" }}
      transition={{ duration: 0.2 }}
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center justify-center text-center transition-colors duration-300 shadow-md"
    >
      <div className="text-2xl sm:text-3xl font-extrabold text-[#9D26FF] mb-1">
        {value}
      </div>
      <div className="text-[var(--foreground-muted)] text-xs sm:text-sm font-medium">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SKELETON LOADER (left panel)
   ═══════════════════════════════════════════════════════════════════ */
function SkeletonLeft() {
  return (
    <div className="animate-pulse">
      <div className="w-10 h-8 bg-purple-900/40 rounded mb-5" />
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5 rounded bg-yellow-400/20" />
        ))}
        <div className="w-20 h-4 rounded bg-gray-700/40 ml-2" />
      </div>
      <div className="space-y-2.5 mb-6">
        <div className="h-5 bg-gray-700/40 rounded w-full" />
        <div className="h-5 bg-gray-700/40 rounded w-5/6" />
        <div className="h-5 bg-gray-700/40 rounded w-4/6" />
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-3 w-24 bg-purple-700/30 rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30" />
            <div className="h-3 bg-gray-700/30 rounded w-40" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-6 w-32 bg-gray-700/30 rounded" />
        <div className="h-6 w-24 bg-gray-700/30 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-purple-900/40" />
        <div>
          <div className="h-4 w-28 bg-gray-700/40 rounded mb-1.5" />
          <div className="h-3 w-40 bg-gray-700/30 rounded" />
        </div>
      </div>
    </div>
  );
}

const MONTH_MAP = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function parseDateValue(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return 0;
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length < 2) return 0;
  const monthKey = parts[0].toLowerCase();
  const year = parseInt(parts[1], 10) || 0;
  const month = MONTH_MAP[monthKey] || 0;
  return year * 100 + month;
}

function sortTestimonialsByDate(list) {
  return [...list].sort((a, b) => {
    const valA = parseDateValue(a.projectDate || a.date);
    const valB = parseDateValue(b.projectDate || b.date);
    if (valB !== valA) {
      return valB - valA; // Descending: newest year & month first
    }
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN TESTIMONIALS SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const [testimonials, setTestimonials]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [direction, setDirection]         = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef                          = useRef(null);

  /* ── Fetch live from Supabase via API ───────────────────────────── */
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data.testimonials) ? data.testimonials : [];
          const sortedList = sortTestimonialsByDate(list);
          setTestimonials(sortedList);
        }
      } catch (err) {
        console.error("Testimonials fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ── Navigation ─────────────────────────────────────────────────── */
  const total = testimonials.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = (i) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
    resetTimer();
  };

  /* ── Auto-play ──────────────────────────────────────────────────── */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (isAutoPlaying && total > 1) {
      timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    }
  }, [isAutoPlaying, goNext, total]);

  useEffect(() => {
    if (isAutoPlaying && total > 1) {
      timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, goNext, total]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => {
      if (prev) clearInterval(timerRef.current);
      return !prev;
    });
  };

  /* ── Empty / loading guard ──────────────────────────────────────── */
  if (!loading && total === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 sm:py-28 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Ambient cyan glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 g-px max-w-7xl mx-auto">

        {/* ── Section heading ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--background-alt)] border border-[var(--border)] rounded-full px-4 py-1.5 mb-4">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-[var(--foreground-heading)] tracking-tight mb-4">
            <span className="font-light">What Our </span>
            <span className="font-extrabold text-[#9D26FF]">
              Clients Say
            </span>
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm sm:text-base max-w-xl mx-auto">
            Real results from real clients — every review comes from a verified Derixio project.
          </p>
        </motion.div>

        {/* ── Main two-column panel ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* LEFT — Testimonial card */}
          <div className="bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-2xl p-7 sm:p-9 min-h-[380px] relative overflow-hidden flex flex-col justify-between">
            {/* Subtle corner glow */}
            <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 bg-[#9D26FF]/10 rounded-full blur-2xl" />

            {/* Auto-play progress bar top line */}
            {isAutoPlaying && total > 1 && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#9D26FF]/20">
                <motion.div
                  key={currentIndex}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="h-full bg-[#9D26FF] origin-left"
                />
              </div>
            )}

            {loading ? (
              <SkeletonLeft />
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                {currentTestimonial && (
                  <TestimonialCard
                    key={currentTestimonial.id || currentIndex}
                    testimonial={currentTestimonial}
                    direction={direction}
                  />
                )}
              </AnimatePresence>
            )}
          </div>

          {/* RIGHT — Navigation + Stats */}
          <div className="flex flex-col gap-5 justify-center">

            {/* Navigation row */}
            <div className="flex flex-col items-center gap-3">
              {/* Arrow + dots + arrow */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => { goPrev(); resetTimer(); }}
                  disabled={loading || total <= 1}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[#9D26FF] hover:text-[#9D26FF] disabled:opacity-30 transition-colors duration-200"
                >
                  <ChevronLeft size={18} />
                </motion.button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  {loading
                    ? [...Array(3)].map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
                      ))
                    : testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          aria-label={`Go to testimonial ${i + 1}`}
                          className={`rounded-full transition-all duration-300 ${
                            i === currentIndex
                              ? "w-7 h-2.5 bg-[#9D26FF] shadow shadow-[#9D26FF]/40"
                              : "w-2.5 h-2.5 bg-[var(--border)] hover:bg-[#9D26FF]/60"
                          }`}
                        />
                      ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => { goNext(); resetTimer(); }}
                  disabled={loading || total <= 1}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[#9D26FF] hover:text-[#9D26FF] disabled:opacity-30 transition-colors duration-200"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>

              {/* Counter */}
              <div className="text-[var(--foreground-muted)] text-xs tracking-wide">
                {loading ? "— of —" : `${currentIndex + 1} of ${total}`}
              </div>
            </div>

            {/* Stats grid 2×2 */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Auto-play toggle */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={toggleAutoPlay}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground-muted)] text-xs font-semibold hover:border-[#9D26FF]/50 hover:text-[#9D26FF] transition-colors duration-200"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause size={13} />
                    AUTO-PLAY: ON
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    AUTO-PLAY: OFF
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
        {/* ── end two-column ── */}
      </div>
    </section>
  );
}
