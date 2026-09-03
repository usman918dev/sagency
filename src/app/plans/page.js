/**
 * /plans — server component wrapper
 *
 * Exports metadata and injects OfferCatalog JSON-LD.
 * Interactive UI (tab switching, modals, order flow) in _PlansContent.
 *
 * PRICING SCHEMA IS DYNAMIC:
 *   buildOffer() reads pricingData at build time.
 *   Update src/lib/plansData.js to auto-sync prices in both UI and schema.
 */
import PlansContent from "./_PlansContent";
import { pricingData, pricingCategories } from "@/lib/plansData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  buildOffer,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "Transparent Pricing Plans – Web, Design, SEO & Marketing",
  description:
    "View Derixio's pricing plans for web development, graphic design, SEO, digital marketing, Amazon PPC, and video production. Starter, Business, and Enterprise tiers available.",
  alternates: {
    canonical: "https://www.derixio.com/plans",
  },
  openGraph: {
    title: "Pricing Plans | Derixio Digital Agency",
    description:
      "Transparent pricing plans for web development, graphic design, SEO, digital marketing, Amazon PPC, and video production services by Derixio.",
    url: "https://www.derixio.com/plans",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio Pricing Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans | Derixio Digital Agency",
    description:
      "Transparent pricing for web development, design, SEO, digital marketing, Amazon PPC, and video production.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function PlansPage() {
  /* ── Breadcrumb ─────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home",  url: "/" },
    { name: "Plans", url: "/plans" },
  ]);

  /* ── WebPage ────────────────────────────────────────────────────── */
  const webPage = buildWebPage({
    url: "/plans",
    name: "Transparent Pricing Plans | Derixio Digital Agency",
    description:
      "Pricing plans for web development, graphic design, SEO, digital marketing, Amazon PPC, and video production services.",
  });

  /* ── OfferCatalog — dynamically built from pricingData ──────────── */
  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${BASE_URL}/plans#offer-catalog`,
    "name": "Derixio Digital Agency Pricing Plans",
    "url": `${BASE_URL}/plans`,
    "provider": organizationRef(),
    "itemListElement": pricingCategories.map((category) => {
      const plans = pricingData[category];
      return {
        "@type": "OfferCatalog",
        "name": `${category} Packages`,
        "itemListElement": [
          buildOffer(plans.basic,    category),
          buildOffer(plans.standard, category),
          buildOffer(plans.custom,   category),
        ],
      };
    }),
  };

  const jsonLd = buildJsonLd([webPage, breadcrumb, offerCatalog]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlansContent />
    </>
  );
}