/**
 * /services — server component wrapper
 *
 * Exports metadata and injects CollectionPage + Service ItemList JSON-LD.
 * Interactive UI rendered by _ServicesContent (client component).
 *
 * NOTE: This page wrapper must NOT include the [slug] children's schema —
 * each service subpage has its own schema in services/[slug]/page.js.
 */
import ServicesContent from "./_ServicesContent";
import { servicesData } from "@/lib/servicesData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "Digital Agency Services – Web, Design, SEO & Marketing",
  description:
    "Explore Derixio's full suite of digital agency services: Amazon Growth, custom web development, graphic design, SEO, digital marketing, and video production for global clients.",
  alternates: {
    canonical: "https://www.derixio.com/services",
  },
  openGraph: {
    title: "Digital Agency Services | Derixio",
    description:
      "Web development, graphic design, SEO, digital marketing, Amazon PPC, and video production services by Derixio – premium digital agency.",
    url: "https://www.derixio.com/services",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio Digital Agency Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Agency Services | Derixio",
    description:
      "Full suite of digital services: web development, graphic design, SEO, digital marketing, Amazon PPC, and video production.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function ServicesPage() {
  /* ── Breadcrumb ─────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home",     url: "/" },
    { name: "Services", url: "/services" },
  ]);

  /* ── CollectionPage (services hub) ─────────────────────────────── */
  const webPage = buildWebPage({
    url: "/services",
    name: "Digital Agency Services – Web, Design, SEO & Marketing | Derixio",
    description:
      "Explore Derixio's full suite of services: web development, graphic design, SEO, digital marketing, Amazon PPC, and video production.",
    type: "CollectionPage",
  });

  /* ── ItemList of Service entities (driven by servicesData) ──────── */
  const serviceItemList = {
    "@type": "ItemList",
    "@id": `${BASE_URL}/services#services-list`,
    "name": "Derixio Digital Agency Services",
    "numberOfItems": servicesData.length,
    "itemListElement": servicesData.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "@id": `${BASE_URL}/services/${service.slug}#service`,
        "name": service.title,
        "url": `${BASE_URL}/services/${service.slug}`,
        "provider": organizationRef(),
        "areaServed": "Worldwide",
      },
    })),
  };

  const jsonLd = buildJsonLd([webPage, breadcrumb, serviceItemList]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  );
}