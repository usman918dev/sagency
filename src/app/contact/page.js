/**
 * /contact — server component wrapper
 *
 * Exports metadata and injects ContactPage + LocalBusiness JSON-LD @graph.
 * Interactive contact form rendered by _ContactContent (client component).
 */
import ContactContent from "./_ContactContent";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  organizationRef,
  BASE_URL,
  ORG_ID,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "Contact Derixio | Free Digital Strategy Consultation",
  description:
    "Contact Derixio digital agency in Lahore, Pakistan. Email: hello@derixio.com | Call: +92 302 4165348. Mon–Fri 9 AM–6 PM. Start your web, design, or marketing project today.",
  alternates: {
    canonical: "https://www.derixio.com/contact",
  },
  openGraph: {
    title: "Contact Derixio | Digital Agency Lahore",
    description:
      "Get in touch with Derixio. Email: hello@derixio.com | Phone: +92 302 4165348 | Lahore, Pakistan. Available Mon–Fri, 9 AM–6 PM.",
    url: "https://www.derixio.com/contact",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Derixio – Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Derixio | Digital Agency Lahore",
    description:
      "Contact Derixio digital agency in Lahore, Pakistan for web development, design, SEO, and digital marketing projects.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function ContactPage() {
  /* ── Breadcrumb ─────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home",    url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  /* ── ContactPage WebPage node ───────────────────────────────────── */
  const webPage = buildWebPage({
    url: "/contact",
    name: "Contact Derixio | Free Digital Strategy Consultation",
    description:
      "Contact Derixio digital agency in Lahore, Pakistan. Start your web development, design, SEO, or digital marketing project today.",
    type: "ContactPage",
  });

  /* ── LocalBusiness (references the canonical org @id) ──────────── */
  const localBusiness = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#local-business`,
    "name": "Derixio",
    "url": BASE_URL,
    "telephone": "+92-302-4165348",
    "email": "hello@derixio.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressCountry": "PK",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-302-4165348",
      "email": "hello@derixio.com",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"],
    },
    "sameAs": [
      "https://web.facebook.com/derixio",
      "https://www.instagram.com/derixio_official/",
      "https://www.linkedin.com/company/derixio/",
    ],
    "parentOrganization": { "@id": ORG_ID },
  };

  const jsonLd = buildJsonLd([webPage, breadcrumb, localBusiness]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  );
}
