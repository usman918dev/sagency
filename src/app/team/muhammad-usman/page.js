import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Globe,
  ExternalLink,
  Award,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Mail,
} from "lucide-react";
import { foundersData } from "@/lib/teamData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildProfilePageSchema,
  buildPersonSchema,
} from "@/lib/schemaHelpers";

const founder = foundersData.find((f) => f.slug === "muhammad-usman");

export const metadata = {
  title: "Muhammad Usman | Founder & CEO of Derixio",
  description:
    "Muhammad Usman is the Founder & CEO of Derixio, specializing in Amazon Listing Design, Premium A+ Content, Branding, Packaging Design, Web Development, SEO, Digital Marketing, and Amazon PPC.",
  alternates: {
    canonical: "https://www.derixio.com/team/muhammad-usman",
  },
  openGraph: {
    title: "Muhammad Usman | Founder & CEO of Derixio",
    description:
      "Muhammad Usman is the Founder & CEO of Derixio, specializing in Amazon Listing Design, Premium A+ Content, Branding, Packaging Design, Web Development, SEO, Digital Marketing, and Amazon PPC.",
    url: "https://www.derixio.com/team/muhammad-usman",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/muhammadusman.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Usman (Usman Lurka) - Founder & CEO of Derixio",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Usman | Founder & CEO of Derixio",
    description:
      "Muhammad Usman is the Founder & CEO of Derixio, specializing in Amazon Listing Design, Premium A+ Content, Branding, Packaging Design, Web Development, SEO, Digital Marketing, and Amazon PPC.",
    images: ["https://www.derixio.com/assets/muhammadusman.jpg"],
  },
};

export default function MuhammadUsmanPage() {
  /* ── Breadcrumb Schema ───────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Muhammad Usman", url: "/team/muhammad-usman" },
  ]);

  /* ── ProfilePage Schema ─────────────────────────────────────────── */
  const profilePageSchema = buildProfilePageSchema({
    url: "/team/muhammad-usman",
    name: "Muhammad Usman | Founder & CEO of Derixio",
    description: founder.firstParagraph,
    personId: founder.schemaId,
  });

  /* ── Person Schema ──────────────────────────────────────────────── */
  const personSchema = buildPersonSchema(founder);

  const jsonLd = buildJsonLd([profilePageSchema, breadcrumb, personSchema]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-[#9D26FF]/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          {/* Breadcrumb Navigation Bar */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-[var(--foreground-muted)]">
              <li>
                <Link href="/" className="hover:text-[#9D26FF] transition-colors">
                  Home
                </Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href="/about" className="hover:text-[#9D26FF] transition-colors">
                  About
                </Link>
              </li>
              <li><span>/</span></li>
              <li className="text-[#9D26FF] font-medium" aria-current="page">
                Muhammad Usman
              </li>
            </ol>
          </nav>

          {/* Hero Profile Header */}
          <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 sm:p-12 mb-16 backdrop-blur-xl shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#9D26FF]/15 to-transparent rounded-bl-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {/* Photo Box */}
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#9D26FF]/40 shadow-xl flex-shrink-0 bg-[var(--background-alt)]">
                <Image
                  src={founder.image}
                  alt="Muhammad Usman (Usman Lurka) - Founder & CEO of Derixio"
                  title="Muhammad Usman (Usman Lurka) - Founder & CEO of Derixio"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={14} />
                  <span>FOUNDER &amp; CEO</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-3">
                  Muhammad Usman
                </h1>

                <p className="text-lg text-[#9D26FF] font-medium mb-6">
                  Founder &amp; Chief Executive Officer at Derixio
                </p>

                {/* Social Buttons: LinkedIn, Behance, Fiverr */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                  {/* LinkedIn */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2] border border-[#0A66C2]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>

                  {/* Behance */}
                  <a
                    href={founder.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0057FF]/15 hover:bg-[#0057FF] border border-[#0057FF]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  >
                    <Globe size={15} />
                    <span>Behance</span>
                  </a>

                  {/* Fiverr */}
                  <a
                    href={founder.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DBF73]/15 hover:bg-[#1DBF73] border border-[#1DBF73]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  >
                    <ExternalLink size={15} />
                    <span>Fiverr</span>
                  </a>
                </div>

                {/* Quick Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
                  <div className="bg-[var(--background-alt)] p-3 rounded-xl border border-[var(--border)]">
                    <span className="block text-xs text-[var(--foreground-muted)] uppercase">Role</span>
                    <span className="text-sm font-semibold text-[var(--foreground-heading)]">Founder &amp; CEO</span>
                  </div>
                  <div className="bg-[var(--background-alt)] p-3 rounded-xl border border-[var(--border)]">
                    <span className="block text-xs text-[var(--foreground-muted)] uppercase">Agency</span>
                    <span className="text-sm font-semibold text-[#9D26FF]">Derixio</span>
                  </div>
                  <div className="bg-[var(--background-alt)] p-3 rounded-xl border border-[var(--border)] col-span-2 sm:col-span-1">
                    <span className="block text-xs text-[var(--foreground-muted)] uppercase">Location</span>
                    <span className="text-sm font-semibold text-[var(--foreground-heading)]">Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Biography Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="lg:col-span-2 space-y-10">
              {/* Mandatory Opening Biography */}
              <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-[var(--foreground-heading)] mb-4 flex items-center gap-3">
                  <Sparkles className="text-[#9D26FF]" size={22} />
                  <span>About Muhammad Usman</span>
                </h2>
                {/* FIRST PARAGRAPH */}
                <p className="text-[var(--foreground-heading)] text-base sm:text-lg leading-relaxed font-medium mb-6">
                  {founder.firstParagraph}
                </p>
                <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
                  {founder.secondParagraph}
                </p>
              </div>

              {/* Founder Story */}
              <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-[var(--foreground-heading)] mb-4 flex items-center gap-3">
                  <Award className="text-[#9D26FF]" size={22} />
                  <span>Founder Story &amp; Vision</span>
                </h2>
                <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
                  {founder.story}
                </p>
              </div>

              {/* Professional Experience */}
              <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-[var(--foreground-heading)] mb-6 flex items-center gap-3">
                  <Briefcase className="text-[#9D26FF]" size={22} />
                  <span>Professional Experience</span>
                </h2>
                <div className="space-y-6">
                  {founder.experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-[#9D26FF]/40">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#9D26FF] border-2 border-[var(--background)]" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h3 className="text-lg font-bold text-[var(--foreground-heading)]">{exp.role}</h3>
                        <span className="text-xs font-semibold text-[#9D26FF] px-2.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)]">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-[#9D26FF] font-medium mb-2">{exp.company}</p>
                      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Skills & Services */}
            <div className="space-y-8">
              {/* Skills */}
              <div className="bg-[var(--card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-6 flex items-center gap-2">
                  <Sparkles className="text-[#9D26FF]" size={18} />
                  <span>Executive Core Skills</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground)] text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services Offered */}
              <div className="bg-[var(--card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold text-[var(--foreground-heading)] mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-[#9D26FF]" size={18} />
                  <span>Services &amp; Leadership</span>
                </h3>
                <ul className="space-y-3">
                  {founder.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground-muted)]">
                      <CheckCircle2 size={16} className="text-[#9D26FF] flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] mb-4">
              Work with Muhammad Usman &amp; the Derixio Team
            </h2>
            <p className="text-[var(--foreground-muted)] text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Looking to transform your Amazon brand, launch high-converting visual systems, or scale your digital presence with strategic creative solutions?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold tracking-wide transition-all duration-300 shadow-xl shadow-[#9D26FF]/20 hover:scale-105"
              >
                <span>Get in Touch with Usman</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:hello@derixio.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--background-alt)] hover:bg-[var(--card-hover)] border border-[var(--border)] text-[var(--foreground-heading)] font-semibold transition-colors"
              >
                <Mail size={18} className="text-[#9D26FF]" />
                <span>hello@derixio.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
