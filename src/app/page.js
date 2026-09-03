/**
 * Homepage — server component wrapper
 *
 * Exports Next.js Metadata and injects server-rendered JSON-LD @graph.
 * The interactive UI is rendered by _HomeContent (client component).
 *
 * TESTIMONIAL SCHEMA IS DYNAMIC:
 *   buildReviewsSchema() reads the live testimonialsData array at build time.
 *   Update src/lib/testimonialsData.js and the schema updates automatically.
 */
import HomeContent from "./_HomeContent";
import { testimonialsData } from "@/lib/testimonialsData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  buildReviewsSchema,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
  description:
    "From Amazon store optimization, A+ content, and PPC advertising to web design, branding, and marketing — Derixio helps your brand grow everywhere it sells.",
  keywords: [
    "We Grow Amazon Brands",
    "Amazon Growth Agency",
    "Derixio",
    "Amazon Store Optimization",
    "Amazon Listing Design",
    "Amazon A+ Content",
    "Creative Growth Agency",
    "Amazon PPC Management",
    "Brand Identity & Web Development",
  ],
  alternates: {
    canonical: "https://www.derixio.com",
  },
  openGraph: {
    title: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
    description:
      "From Amazon store optimization, A+ content, and PPC advertising to web design, branding, and marketing — Derixio helps your brand grow everywhere it sells.",
    url: "https://www.derixio.com",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
    description:
      "From Amazon store optimization, A+ content, and PPC advertising to web design, branding, and marketing — Derixio helps your brand grow everywhere it sells.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function HomePage() {
  /* ── Breadcrumb ────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([{ name: "Home", url: "/" }]);

  /* ── WebPage ────────────────────────────────────────────────────── */
  const webPage = buildWebPage({
    url: "/",
    name: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
    description:
      "From Amazon store optimization, A+ content, and PPC advertising to web design, branding, and marketing — Derixio helps your brand grow everywhere it sells.",
  });

  /* ── Reviews + AggregateRating (DYNAMIC — driven by testimonialsData) ─ */
  const { reviews, aggregateRating } = buildReviewsSchema(testimonialsData);

  /* ── Assemble @graph ────────────────────────────────────────────── */
  const jsonLd = buildJsonLd([
    webPage,
    breadcrumb,
    ...(aggregateRating ? [aggregateRating] : []),
    ...reviews,
  ]);

  return (
    <>
      {/* Page-specific JSON-LD — server rendered, visible to crawlers immediately */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Interactive homepage UI — client component */}
      <HomeContent />
    </>
  );
}
