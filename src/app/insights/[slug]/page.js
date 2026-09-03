import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Linkedin,
  Globe,
  ExternalLink,
  User,
  Share2,
  CheckCircle2,
  Bookmark
} from "lucide-react";
import {
  insightsArticles,
  getArticleBySlug,
  getAllArticleSlugs
} from "@/lib/insightsData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  buildArticleSchema,
  buildPersonSchema
} from "@/lib/schemaHelpers";

export async function generateStaticParams() {
  return insightsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const fullImageUrl = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : `https://www.derixio.com${article.featuredImage}`;

  return {
    title: `${article.seoTitle} | Derixio Insights`,
    description: article.metaDescription,
    alternates: {
      canonical: article.canonicalUrl,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: article.canonicalUrl,
      siteName: "Derixio",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [fullImageUrl],
    },
  };
}

/**
 * Renders article inline markdown formatting (bold, subheadings, links, bullet points).
 */
function FormatText({ content }) {
  // Check if content contains ### subheadings for card grid layout
  if (content.includes("### ")) {
    const parts = content.split(/(?=### )/);
    const intro = parts[0].trim();
    const cards = [];

    for (let i = 1; i < parts.length; i++) {
      const block = parts[i].trim();
      const lines = block.split("\n").filter(Boolean);
      const titleLine = lines[0].replace(/^###\s*/, "").trim();
      const bodyText = lines.slice(1).join(" ").trim();

      const numMatch = titleLine.match(/^(\d+)[\.\s]*\s*(.*)/);
      let number = String(i).padStart(2, "0");
      let title = titleLine;

      if (numMatch) {
        number = String(numMatch[1]).padStart(2, "0");
        title = numMatch[2];
      }

      cards.push({ number, title, description: bodyText });
    }

    return (
      <div className="space-y-6">
        {intro && (
          <p className="text-[var(--foreground)] text-base sm:text-lg leading-relaxed font-medium">
            {parseInlineText(intro)}
          </p>
        )}
        <div className={`grid grid-cols-1 ${cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 my-6`}>
          {cards.map((card, cIdx) => (
            <div
              key={cIdx}
              className="relative p-6 rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] hover:border-[#9D26FF]/60 shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#9D26FF]/10 rounded-bl-full blur-xl pointer-events-none group-hover:bg-[#9D26FF]/20 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[#9D26FF] text-xs font-extrabold tracking-wider">
                    {card.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[#9D26FF] transition-colors">
                    <Sparkles size={16} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors mb-3 leading-snug">
                  {parseInlineText(card.title)}
                </h3>
                <div className="h-0.5 w-10 bg-gradient-to-r from-[#9D26FF] to-transparent mb-3" />
                <p className="text-[var(--foreground-muted)] text-sm leading-relaxed font-normal">
                  {parseInlineText(card.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const paragraphs = content.split("\n\n");

  return (
    <div className="space-y-4">
      {paragraphs.map((p, pIdx) => {
        // Subheadings inside content (### Heading)
        if (p.startsWith("### ")) {
          return (
            <h3 key={pIdx} className="text-xl font-bold text-[#9D26FF] mt-6 mb-2">
              {p.replace("### ", "")}
            </h3>
          );
        }

        // Bullet lists
        if (p.includes("\n• ") || p.startsWith("• ")) {
          const items = p.split("\n").filter(Boolean);
          return (
            <ul key={pIdx} className="space-y-2 my-4 pl-2">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-3 text-[var(--foreground)] text-base leading-relaxed">
                  <CheckCircle2 size={16} className="text-[#9D26FF] flex-shrink-0 mt-1" />
                  <span>{parseInlineText(item.replace("• ", ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered lists
        if (/^\d+\.\s/.test(p) || p.includes("\n1. ")) {
          const items = p.split("\n").filter(Boolean);
          return (
            <ol key={pIdx} className="space-y-2 my-4 pl-2">
              {items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-3 text-[var(--foreground)] text-base leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {iIdx + 1}
                  </span>
                  <span>{parseInlineText(item.replace(/^\d+\.\s*/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Standard Paragraph
        return (
          <p key={pIdx} className="text-[var(--foreground)] text-base sm:text-lg leading-relaxed">
            {parseInlineText(p)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parses markdown [label](url) and **bold** elements into React nodes.
 */
function parseInlineText(text) {
  // Regex to split links [label](url) and bold **bold**
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const label = match[1];
        const url = match[2];
        const isExternal = url.startsWith("http");

        if (isExternal) {
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9D26FF] font-medium hover:underline underline-offset-4"
            >
              {label}
            </a>
          );
        }
        return (
          <Link
            key={index}
            href={url}
            className="text-[#9D26FF] font-semibold hover:underline underline-offset-4"
          >
            {label}
          </Link>
        );
      }
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-[var(--foreground-heading)]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  /* ── Schemas ───────────────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/insights" },
    { name: article.title, url: `/insights/${article.slug}` },
  ]);

  const webPageSchema = buildWebPage({
    url: `/insights/${article.slug}`,
    name: article.seoTitle,
    description: article.metaDescription,
  });

  // Determine targeted entity pointers based on article slug
  let targetMainEntity;
  let targetAbout;
  if (article.slug === "who-is-muhammad-usman") {
    targetMainEntity = { "@id": "https://www.derixio.com/team/muhammad-usman#person" };
    targetAbout = { "@id": "https://www.derixio.com/team/muhammad-usman#person" };
  } else if (article.slug === "who-is-muhammad-sajjad") {
    targetMainEntity = { "@id": "https://www.derixio.com/team/muhammad-sajjad#person" };
    targetAbout = { "@id": "https://www.derixio.com/team/muhammad-sajjad#person" };
  } else {
    targetMainEntity = [
      { "@id": "https://www.derixio.com/team/muhammad-usman#person" },
      { "@id": "https://www.derixio.com/team/muhammad-sajjad#person" },
    ];
    targetAbout = [
      { "@id": "https://www.derixio.com/team/muhammad-usman#person" },
      { "@id": "https://www.derixio.com/team/muhammad-sajjad#person" },
    ];
  }

  const authorSchema = {
    "@type": "Person",
    "@id": article.author.schemaId || `https://www.derixio.com${article.author.profileUrl}#person`,
    "name": article.author.name,
    "alternateName": article.author.name.includes("Usman")
      ? "Usman Lurka"
      : article.author.name.includes("Sajjad")
      ? "Sajjad Aulakh"
      : undefined,
    "jobTitle":
      article.author.role ||
      (article.author.name.includes("Usman")
        ? "Founder & CEO"
        : article.author.name.includes("Sajjad")
        ? "Co-Founder & Creative Director"
        : "Executive Leadership"),
    "url": article.author.profileUrl.startsWith("http")
      ? article.author.profileUrl
      : `https://www.derixio.com${article.author.profileUrl}`,
    "worksFor": { "@id": "https://www.derixio.com/#organization" },
    "sameAs": [
      article.author.linkedin,
      article.author.behance,
      article.author.fiverr,
    ].filter(Boolean),
  };

  const articleSchema = buildArticleSchema({
    url: `/insights/${article.slug}`,
    headline: article.title,
    description: article.metaDescription,
    image: article.featuredImage,
    datePublished: article.publishDate,
    author: authorSchema,
    articleSection: article.category,
    keywords: article.tags,
    mainEntity: targetMainEntity,
    about: targetAbout,
    mentions: { "@id": "https://www.derixio.com/#organization" },
  });

  const jsonLd = buildJsonLd([webPageSchema, breadcrumb, articleSchema]);

  const relatedArticles = insightsArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 pb-20 overflow-hidden">
        {/* Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#9D26FF]/10 rounded-full blur-[220px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs sm:text-sm text-[var(--foreground-muted)]">
              <li>
                <Link href="/" className="hover:text-[#9D26FF] transition-colors">
                  Home
                </Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href="/insights" className="hover:text-[#9D26FF] transition-colors">
                  Insights
                </Link>
              </li>
              <li><span>/</span></li>
              <li className="text-[#9D26FF] font-medium truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 mb-4 justify-center sm:justify-start">
              <span className="px-3.5 py-1 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Clock size={13} className="text-[#9D26FF]" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                <Calendar size={13} className="text-[#9D26FF]" />
                {article.publishDate}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            {/* Author Quick Info */}
            <div className="flex items-center justify-between py-4 border-y border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#9D26FF]/50 flex-shrink-0 bg-[var(--background-alt)]">
                  <Image
                    src={article.author.image}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="block text-sm font-bold text-[var(--foreground-heading)]">
                    {article.author.name}
                  </span>
                  <span className="block text-xs text-[#9D26FF] font-semibold">
                    {article.author.role}
                  </span>
                </div>
              </div>

              {article.author.profileUrl && (
                <Link
                  href={article.author.profileUrl}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--background-alt)] hover:bg-[#9D26FF]/10 border border-[var(--border)] text-xs font-semibold text-[#9D26FF] transition-colors"
                >
                  <User size={13} />
                  <span>View Founder Profile</span>
                </Link>
              )}
            </div>
          </header>

          {/* Featured Image - Centered Fitted Card Frame */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md sm:max-w-lg h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border-2 border-[#9D26FF]/40 shadow-xl bg-[var(--card)] p-4 flex items-center justify-center">
              {article.featuredImage.includes("logo") ? (
                <>
                  <Image
                    src="/assets/derixio-official-logo-light.png"
                    alt={article.title}
                    fill
                    priority
                    className="object-contain p-8 logo-light-mode dark:hidden"
                  />
                  <Image
                    src="/assets/derixio-official-logo.png"
                    alt={article.title}
                    fill
                    priority
                    className="object-contain p-8 logo-dark-mode hidden dark:block"
                  />
                </>
              ) : (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover object-top rounded-2xl"
                />
              )}
            </div>
          </div>

          {/* Article Sections */}
          <main className="space-y-10 mb-16">
            {article.sections.map((section, idx) => (
              <section
                key={idx}
                className="bg-[var(--card)] border border-[var(--border)] p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-lg"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground-heading)] mb-4 flex items-center gap-3">
                  <Sparkles className="text-[#9D26FF]" size={22} />
                  <span>{section.heading}</span>
                </h2>

                <FormatText content={section.content} />
              </section>
            ))}
          </main>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pt-4 border-t border-[var(--border)]">
            <span className="text-xs font-semibold text-[var(--foreground-muted)] mr-2 flex items-center gap-1">
              <Bookmark size={14} className="text-[#9D26FF]" />
              Tags:
            </span>
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-[var(--background-alt)] border border-[var(--border)] text-[var(--foreground-muted)] text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Detailed Author Profile Card */}
          <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 mb-16 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#9D26FF]/50 shadow-lg flex-shrink-0 bg-[var(--background-alt)]">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="inline-block text-xs font-bold text-[#9D26FF] uppercase tracking-wider mb-1">
                  ABOUT THE AUTHOR
                </span>
                <h3 className="text-xl font-extrabold text-[var(--foreground-heading)] mb-1">
                  {article.author.name}
                </h3>
                <p className="text-xs text-[#9D26FF] font-semibold mb-3">
                  {article.author.role}
                </p>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-4">
                  {article.author.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  {article.author.profileUrl && (
                    <Link
                      href={article.author.profileUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white text-xs font-bold transition-transform hover:scale-105 shadow-md"
                    >
                      <User size={14} />
                      <span>Full Founder Profile</span>
                    </Link>
                  )}

                  {article.author.linkedin && (
                    <a
                      href={article.author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0A66C2]/20 hover:bg-[#0A66C2] border border-[#0A66C2]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {article.author.behance && (
                    <a
                      href={article.author.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0057FF]/20 hover:bg-[#0057FF] border border-[#0057FF]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Globe size={14} />
                      <span>Behance</span>
                    </a>
                  )}

                  {article.author.fiverr && (
                    <a
                      href={article.author.fiverr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1DBF73]/20 hover:bg-[#1DBF73] border border-[#1DBF73]/40 text-[var(--foreground-heading)] hover:text-white text-xs font-semibold transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Fiverr Profile</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Insights */}
          {relatedArticles.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[var(--foreground-heading)] mb-6">
                Related Derixio Insights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.slug}`}
                    className="group block p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[#9D26FF] transition-all hover:-translate-y-1"
                  >
                    <span className="text-xs font-semibold text-[#9D26FF] block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-bold text-[var(--foreground-heading)] group-hover:text-[#9D26FF] transition-colors leading-snug mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
                      {rel.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Conversion CTA Section */}
          <div className="relative rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 text-center backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-extrabold text-[var(--foreground-heading)] mb-3">
              Ready to Accelerate Your Brand Growth?
            </h3>
            <p className="text-[var(--foreground-muted)] text-sm sm:text-base max-w-lg mx-auto mb-6">
              Work directly with Muhammad Usman, Muhammad Sajjad, and the Derixio team to transform your Amazon listings, branding, and digital presence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#9D26FF] to-[#7C3AED] text-white font-bold text-sm hover:scale-105 transition-all shadow-lg"
              >
                <span>Get Started with Derixio</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
