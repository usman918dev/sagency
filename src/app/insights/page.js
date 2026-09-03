import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { insightsArticles } from "@/lib/insightsData";
import { buildJsonLd, buildBreadcrumb, buildWebPage } from "@/lib/schemaHelpers";

export const metadata = {
  title: "Derixio Insights | Executive Profiles & Entity Recognition",
  description:
    "Executive profiles and leadership insights from Derixio founders Muhammad Usman (Founder & CEO) and Muhammad Sajjad (Co-Founder & Creative Director).",
  alternates: {
    canonical: "https://www.derixio.com/insights",
  },
  openGraph: {
    title: "Derixio Insights | Executive Profiles & Entity Recognition",
    description:
      "Executive profiles and leadership insights from Derixio founders Muhammad Usman (Founder & CEO) and Muhammad Sajjad (Co-Founder & Creative Director).",
    url: "https://www.derixio.com/insights",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio Insights & Executive Leadership",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derixio Insights | Executive Profiles & Entity Recognition",
    description:
      "Executive profiles and leadership insights from Derixio founders Muhammad Usman and Muhammad Sajjad.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function InsightsIndexPage() {
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/insights" },
  ]);

  const webPageSchema = buildWebPage({
    url: "/insights",
    name: "Derixio Insights | Executive Profiles & Entity Recognition",
    description:
      "Executive profiles and leadership insights from Derixio founders Muhammad Usman and Muhammad Sajjad.",
  });

  const jsonLd = buildJsonLd([webPageSchema, breadcrumb]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-20 overflow-hidden">
        {/* Background Ambient Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-[var(--foreground-muted)]">
              <li>
                <Link href="/" className="hover:text-[#9D26FF] transition-colors">
                  Home
                </Link>
              </li>
              <li><span>/</span></li>
              <li className="text-[#9D26FF] font-medium" aria-current="page">
                Insights
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} />
              <span>EXECUTIVE PERSPECTIVES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--foreground-heading)] tracking-tight leading-tight mb-3">
              <span className="font-light">Derixio </span>
              <span className="font-extrabold text-[#9D26FF]">Insights</span>
            </h1>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed">
              Official executive profiles and organizational insights for Derixio and its founders,{" "}
              <Link href="/team/muhammad-usman" className="text-[#9D26FF] hover:underline font-semibold">
                Muhammad Usman
              </Link>{" "}
              and{" "}
              <Link href="/team/muhammad-sajjad" className="text-[#9D26FF] hover:underline font-semibold">
                Muhammad Sajjad
              </Link>.
            </p>
          </div>

          {/* Clean 3-Card Minimal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {insightsArticles.map((article) => (
              <article
                key={article.id}
                className="group relative flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all duration-300 backdrop-blur-xl shadow-xl overflow-hidden hover:-translate-y-1"
              >
                {/* Article Image Header Container */}
                <div className="relative w-full h-72 bg-[var(--background-alt)] overflow-hidden flex items-center justify-center p-4">
                  {article.featuredImage.includes("logo") ? (
                    <>
                      <Image
                        src="/assets/derixio-official-logo-light.png"
                        alt={article.title}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 logo-light-mode dark:hidden"
                      />
                      <Image
                        src="/assets/derixio-official-logo.png"
                        alt={article.title}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 logo-dark-mode hidden dark:block"
                      />
                    </>
                  ) : (
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-[11px] font-semibold shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-[var(--foreground-muted)] mb-2.5">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#9D26FF]" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#9D26FF]" />
                        {article.publishDate}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-snug mb-2">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-[var(--foreground-muted)] text-xs line-clamp-3 leading-relaxed">
                      {article.metaDescription}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[var(--foreground-muted)]">
                      {article.author.name}
                    </span>

                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#9D26FF] hover:underline transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Minimal Agency Footer Callout */}
          <div className="relative rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 text-center shadow-lg">
            <p className="text-[var(--foreground-muted)] text-xs sm:text-sm max-w-xl mx-auto mb-4">
              Derixio is a creative growth agency helping brands scale through strategic branding, Amazon creative solutions, web development, and performance marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold text-xs transition-transform hover:scale-105 shadow-md"
              >
                <span>About Derixio Agency</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
