/**
 * /about — server component wrapper
 *
 * Exports metadata and injects AboutPage + Person JSON-LD @graph.
 * Person schemas driven by foundersData (shared with TeamSection UI component).
 * Interactive content rendered by _AboutContent (client component).
 */
import AboutContent from "./_AboutContent";
import { foundersData } from "@/lib/teamData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  buildPersonSchema,
  organizationRef,
  BASE_URL,
  ORG_ID,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "About Derixio | Premium Digital Agency in Lahore, Pakistan",
  description:
    "Learn about Derixio – a premium digital agency in Lahore, Pakistan, delivering 150+ projects in web development, graphic design, SEO, digital marketing, and Amazon PPC for global clients.",
  alternates: {
    canonical: "https://www.derixio.com/about",
  },
  openGraph: {
    title: "About Derixio | Premium Digital Agency",
    description:
      "Derixio is a premium digital agency in Lahore, Pakistan, delivering web development, brand design, SEO, and digital marketing for global clients.",
    url: "https://www.derixio.com/about",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "About Derixio – Premium Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Derixio | Premium Digital Agency",
    description:
      "Premium digital agency in Lahore: web development, brand design, SEO, and digital marketing for global clients.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function AboutPage() {
  /* ── Breadcrumb ─────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home",  url: "/" },
    { name: "About", url: "/about" },
  ]);

  /* ── AboutPage WebPage node ─────────────────────────────────────── */
  const webPage = buildWebPage({
    url: "/about",
    name: "About Derixio | Premium Digital Agency in Lahore, Pakistan",
    description:
      "Learn about Derixio – a premium digital agency in Lahore, Pakistan, with 150+ projects delivered in web development, graphic design, SEO, and digital marketing.",
    type: "AboutPage",
  });

  /* ── Person schemas — driven by shared foundersData ─────────────── */
  const personSchemas = foundersData.map((founder) => buildPersonSchema(founder));

  const jsonLd = buildJsonLd([webPage, breadcrumb, ...personSchemas]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
