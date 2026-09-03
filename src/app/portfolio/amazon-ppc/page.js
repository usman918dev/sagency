import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedAmazonPpcCaseStudies } from '@/lib/amazonPpcStore';
import { ArrowRight, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';
import AmazonPpcProvenResults from '@/components/services/AmazonPpcProvenResults';

export const metadata = {
  title: 'Amazon Growth Case Studies | Derixio Portfolio',
  description: 'Explore real Amazon Growth performance case studies, listing optimization, lower ACoS strategies, and campaign scaling results engineered by Derixio.',
};

export const revalidate = 0; // Dynamic server rendering

export default async function AmazonPpcPortfolioPage() {
  const caseStudies = await getPublishedAmazonPpcCaseStudies();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-24 relative overflow-hidden bg-agenko-grid">
      {/* Derixio Purple Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="g-px max-w-7xl mx-auto relative z-10">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="text-[#9D26FF]" />
            <span>AMAZON BRAND GROWTH RESULTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-6">
            Amazon Growth <br className="hidden sm:inline" />
            <span className="text-[#9D26FF]">Case Studies</span>
          </h1>

          <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore verified campaign performance screenshots, listing optimization results, A+ content, and lower ACoS scaling strategies delivered for client Amazon storefronts.
          </p>
        </div>

        {/* PROVEN RESULTS OVERALL SERVICE STATISTICS SECTION */}
        <AmazonPpcProvenResults />

        {/* Dynamic Case Studies Count Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)] text-xs font-semibold text-[var(--foreground-muted)]">
          <span className="flex items-center space-x-2 text-[var(--foreground-heading)]">
            <BarChart2 size={16} className="text-[#9D26FF]" />
            <span>Showing {caseStudies.length} {caseStudies.length === 1 ? 'Case Study' : 'Case Studies'}</span>
          </span>
          <span className="text-[var(--foreground-muted)] font-mono">100% Database-Driven</span>
        </div>

        {/* 100% DATABASE DRIVEN CASE STUDY CARDS */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 max-w-xl mx-auto shadow-2xl">
            <TrendingUp size={48} className="text-[#9D26FF] mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold text-[var(--foreground-heading)] mb-2">No Published Case Studies Yet</h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-6">
              Our team is currently preparing new Amazon PPC campaign case studies. Please check back shortly or schedule a direct consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-2xl bg-[#9D26FF] hover:bg-[#8500ED] text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-105"
            >
              Schedule Free Strategy Call
            </Link>
          </div>
        ) : (
          /* PREMIUM DERIXIO DARK CASE STUDY CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((item, index) => {
              const coverUrl = item.resultImageUrl || item.mainResultImageUrl || item.coverImageUrl || '';
              const detailUrl = `/portfolio/amazon-ppc/case-study/${item.slug}`;

              return (
                <div
                  key={item.id || index}
                  className="bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5"
                >
                  {/* Card Cover Image: Admin-uploaded Result Screenshot cleanly rendered */}
                  <Link href={detailUrl} className="relative w-full aspect-[16/10] bg-[var(--background-alt)] overflow-hidden block">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[var(--foreground-muted)]">
                        Result Screenshot
                      </div>
                    )}

                    {/* Dark gradient edge transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="mb-6">
                      <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-[#9D26FF] mb-2">
                        <TrendingUp size={12} />
                        <span>Amazon PPC Case Study</span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--foreground-heading)] tracking-tight leading-snug group-hover:text-[#9D26FF] transition-colors mb-3">
                        <Link href={detailUrl}>
                          {item.title}
                        </Link>
                      </h3>

                      <p className="text-[var(--foreground-muted)] text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {item.shortDescription || item.summary}
                      </p>
                    </div>

                    {/* Read Case Study CTA Link */}
                    <Link
                      href={detailUrl}
                      className="inline-flex items-center text-xs sm:text-sm font-bold text-[#9D26FF] hover:text-[#8500ED] transition-colors space-x-2 pt-4 border-t border-[var(--border)] group/link"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
