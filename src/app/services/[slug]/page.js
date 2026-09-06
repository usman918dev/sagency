/**
 * /services/[slug] — server component
 *
 * Per-service page with:
 *   - Enhanced generateMetadata (unique title, description, canonical, OG, Twitter)
 *   - JSON-LD @graph: WebPage + BreadcrumbList + Service (with Offer per pricing tier)
 */
import { servicesData, getServiceBySlug } from "@/lib/servicesData";
import Hero from "@/components/services/Hero";
import MetricsRow from "@/components/services/MetricsRow";
import ServiceOverview from "@/components/services/ServiceOverview";
import FeaturesList from "@/components/services/FeaturesList";
import ProcessSection from "@/components/services/ProcessSection";
import PricingPlans from "@/components/services/PricingPlans";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import CTA from "@/components/services/CTA";
import AmazonPpcProvenResults from "@/components/services/AmazonPpcProvenResults";
import {
  buildJsonLd,
  buildBreadcrumb,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

/** Strip HTML tags and normalise whitespace from rich-text description */
function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The service you are looking for does not exist.",
    };
  }

  const rawDesc = stripHtml(service.description);
  // Keep description 140-160 chars; truncate at word boundary
  const desc =
    rawDesc.length > 155
      ? rawDesc.substring(0, rawDesc.lastIndexOf(" ", 152)) + "..."
      : rawDesc;

  const title = `${service.title} Services | Derixio Digital Agency`;
  const canonical = `https://www.derixio.com/services/${service.slug}`;
  const ogImage = `https://www.derixio.com${service.coverImage}`;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      siteName: "Derixio",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${service.title} – Derixio` }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

/** Build an Offer node for a single pricing plan */
function planToOffer(plan, serviceTitle) {
  const isCustom = plan.price === "Custom Quote";
  const base = {
    "@type": "Offer",
    "name": `${plan.planName} – ${serviceTitle}`,
    "url": isCustom ? `${BASE_URL}/contact` : `${BASE_URL}/plans`,
    "availability": "https://schema.org/InStock",
    "offeredBy": organizationRef(),
  };

  if (isCustom) {
    return {
      ...base,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Custom quote – contact Derixio for enterprise pricing",
      },
    };
  }

  // Parse numeric value — handles "$1,299" and "$699/mo"
  const priceValue = parseFloat(plan.price.replace(/[^0-9.]/g, "")) || 0;
  const isMonthly = plan.price.includes("/mo");

  const offerObj = {
    ...base,
    "price": String(priceValue),
    "priceCurrency": "USD",
  };

  if (isMonthly) {
    offerObj.priceSpecification = {
      "@type": "UnitPriceSpecification",
      "price": String(priceValue),
      "priceCurrency": "USD",
      "unitCode": "MON",
      "unitText": "per month",
    };
  }

  return offerObj;
}

const ServicePage = async ({ params }) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[var(--background)] pt-32 pb-24 text-center text-white">
        <h1 className="text-3xl font-extrabold">Service Not Found</h1>
      </main>
    );
  }

  /* ── JSON-LD ──────────────────────────────────────────────────── */
  const rawDesc = stripHtml(service.description);
  const pageUrl = `/services/${service.slug}`;

  const breadcrumb = buildBreadcrumb([
    { name: "Home",     url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: pageUrl },
  ]);

  const webPage = {
    "@type": "WebPage",
    "@id": `${BASE_URL}${pageUrl}#webpage`,
    "url": `${BASE_URL}${pageUrl}`,
    "name": `${service.title} Services | Derixio Digital Agency`,
    "description": rawDesc.substring(0, 155),
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "about": organizationRef(),
    "breadcrumb": { "@id": `${BASE_URL}${pageUrl}#breadcrumb` },
    "inLanguage": "en-US",
  };

  const serviceSchema = {
    "@type": "Service",
    "@id": `${BASE_URL}${pageUrl}#service`,
    "name": service.title,
    "url": `${BASE_URL}${pageUrl}`,
    "description": rawDesc.substring(0, 300),
    "serviceType": service.title,
    "provider": organizationRef(),
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${BASE_URL}${pageUrl}`,
    },
    "offers": service.pricingPlans.map((plan) => planToOffer(plan, service.title)),
  };

  const jsonLd = buildJsonLd([webPage, breadcrumb, serviceSchema]);
  const isAmazonPpc = service.slug === 'ecommerce-development';

  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 bg-agenko-grid overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero */}
      <Hero
        title={service.title}
        subtitle={service.subtitle}
        coverImage={service.coverImage}
        icon={service.icon}
        badge={service.badge}
      />

      {/* 2. Stats/Metrics Row */}
      <MetricsRow metrics={service.metrics} />

      {/* 3. Service Overview */}
      <ServiceOverview
        description={service.description}
        techStack={service.techStack}
        mockupSlot={service.mockupSlot}
      />

      {isAmazonPpc && (
        <div className="g-px max-w-7xl mx-auto py-8">
          <AmazonPpcProvenResults />
        </div>
      )}

      {/* 4. Capabilities / Deliverables Grid */}
      <FeaturesList features={service.features} />

      {/* 5. Process Timeline */}
      <ProcessSection process={service.process} />

      {/* 6. Pricing */}
      <PricingPlans plans={service.pricingPlans} serviceTitle={service.title} />

      {/* 7. FAQ Accordion */}
      <ServiceFAQ faqs={service.faqs} />

      {/* 8. CTA Band */}
      <CTA />
    </main>
  );
};

export default ServicePage;

