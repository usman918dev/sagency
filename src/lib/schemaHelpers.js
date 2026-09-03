/**
 * schemaHelpers.js
 * ─────────────────────────────────────────────────────────────
 * Reusable Schema.org JSON-LD builder utilities for Derixio.
 *
 * IMPORTANT: This file is imported by server components only.
 * Do NOT add "use client" here.
 *
 * The canonical entity @ids:
 *   Organization → https://www.derixio.com/#organization
 *   WebSite      → https://www.derixio.com/#website
 *
 * Every page references these via @id rather than duplicating
 * the full object — the "entity consistency" pattern Google prefers.
 */

export const BASE_URL = "https://www.derixio.com";
export const ORG_ID   = `${BASE_URL}/#organization`;
export const SITE_ID  = `${BASE_URL}/#website`;

/** Lightweight reference to the canonical Organization entity */
export const organizationRef = () => ({ "@id": ORG_ID });

/** Lightweight reference to the canonical WebSite entity */
export const websiteRef = () => ({ "@id": SITE_ID });

/**
 * Wraps an array of schema graph items into a valid JSON-LD document.
 * @param {object|object[]} graphItems
 * @returns {{ "@context": string, "@graph": object[] }}
 */
export function buildJsonLd(graphItems) {
  return {
    "@context": "https://schema.org",
    "@graph": Array.isArray(graphItems) ? graphItems : [graphItems]
  };
}

/**
 * Builds a BreadcrumbList schema node.
 * @param {{ name: string, url: string }[]} items  - ordered list, Home first
 * @returns {object}
 *
 * Example:
 *   buildBreadcrumb([
 *     { name: "Home",     url: "/" },
 *     { name: "Services", url: "/services" },
 *     { name: "Web Dev",  url: "/services/web-development" }
 *   ])
 */
export function buildBreadcrumb(items) {
  const pageUrl = items[items.length - 1].url;
  return {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}${pageUrl}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Builds a WebPage (or subtype) schema node.
 * @param {{ url: string, name: string, description: string, type?: string }} opts
 * @returns {object}
 */
export function buildWebPage({ url, name, description, type = "WebPage" }) {
  return {
    "@type": type,
    "@id": `${BASE_URL}${url}#webpage`,
    "url": `${BASE_URL}${url}`,
    "name": name,
    "description": description,
    "isPartOf": websiteRef(),
    "about": organizationRef(),
    "breadcrumb": { "@id": `${BASE_URL}${url}#breadcrumb` },
    "inLanguage": "en-US"
  };
}

/**
 * Converts "Month YYYY" strings (e.g. "March 2024") to ISO 8601 date "YYYY-MM-01".
 * Falls back to today's date if the format is unrecognised.
 * @param {string} dateStr
 * @returns {string}
 */
function monthYearToISO(dateStr) {
  const monthMap = {
    January:   "01", February: "02", March:    "03", April:    "04",
    May:       "05", June:     "06", July:     "07", August:   "08",
    September: "09", October:  "10", November: "11", December: "12"
  };
  const [month, year] = (dateStr || "").split(" ");
  if (month && year && monthMap[month]) {
    return `${year}-${monthMap[month]}-01`;
  }
  return new Date().toISOString().split("T")[0];
}

/**
 * Dynamically builds Review[] + AggregateRating from a testimonials array.
 *
 * The testimonials array is the single source of truth (testimonialsData.js).
 * Any change to reviewer names, ratings, or text automatically propagates
 * to the structured data without any manual schema edits.
 *
 * @param {Array<{
 *   name: string,
 *   rating: number,
 *   text: string,
 *   date: string,
 *   position?: string,
 *   company?: string
 * }>} testimonials
 * @returns {{ reviews: object[], aggregateRating: object }}
 */
export function buildReviewsSchema(testimonials) {
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return { reviews: [], aggregateRating: null };
  }

  const totalRating = testimonials.reduce((sum, t) => sum + (t.rating || 0), 0);
  const avgRating   = (totalRating / testimonials.length).toFixed(1);

  const reviews = testimonials.map((t) => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name,
      ...(t.position && t.company
        ? { "description": `${t.position} at ${t.company}` }
        : {})
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": String(t.rating),
      "bestRating":  "5",
      "worstRating": "1"
    },
    "reviewBody": t.text,
    "datePublished": monthYearToISO(t.date),
    "itemReviewed": organizationRef()
  }));

  const aggregateRating = {
    "@type": "AggregateRating",
    "itemReviewed": organizationRef(),
    "ratingValue":  avgRating,
    "reviewCount":  String(testimonials.length),
    "bestRating":   "5",
    "worstRating":  "1"
  };

  return { reviews, aggregateRating };
}

/**
 * Builds an Offer schema node for a single pricing plan.
 * Enterprise "Custom Quote" plans use priceSpecification instead of a price value.
 *
 * @param {{ name: string, priceValue: number|null, priceCurrency: string,
 *           isMonthly: boolean, description: string }} plan
 * @param {string} categoryName
 * @returns {object}
 */
export function buildOffer(plan, categoryName) {
  const base = {
    "@type": "Offer",
    "name": `${plan.name} – ${categoryName}`,
    "description": plan.description,
    "url": `${BASE_URL}/plans`,
    "availability": "https://schema.org/InStock",
    "offeredBy": organizationRef()
  };

  if (plan.priceValue === null) {
    // Enterprise / Custom Quote
    return {
      ...base,
      "url": `${BASE_URL}/contact`,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Custom quote – contact Derixio for enterprise pricing"
      }
    };
  }

  const offerObj = {
    ...base,
    "price":         String(plan.priceValue),
    "priceCurrency": plan.priceCurrency || "USD"
  };

  if (plan.isMonthly) {
    offerObj.priceSpecification = {
      "@type": "UnitPriceSpecification",
      "price":         String(plan.priceValue),
      "priceCurrency": plan.priceCurrency || "USD",
      "unitCode":      "MON",
      "unitText":      "per month"
    };
  }

  return offerObj;
}

/**
 * Builds a canonical Google Person schema node.
 * @param {{
 *   name: string,
 *   image: string,
 *   url: string,
 *   jobTitle: string,
 *   description: string,
 *   sameAs: string[],
 *   schemaId?: string
 * }} founder
 * @returns {object}
 */
/**
 * Builds a canonical Google Person schema node.
 * @param {{
 *   name: string,
 *   alternateName?: string,
 *   image: string,
 *   url: string,
 *   jobTitle: string,
 *   description: string,
 *   sameAs: string[],
 *   skills?: string[],
 *   schemaId?: string
 * }} founder
 * @returns {object}
 */
export function buildPersonSchema(founder) {
  const imageUrl = founder.image.startsWith("http") ? founder.image : `${BASE_URL}${founder.image}`;
  const personUrl = (founder.profileUrl || founder.url || "").startsWith("http")
    ? (founder.profileUrl || founder.url)
    : `${BASE_URL}${founder.profileUrl || founder.url}`;
  const personId = founder.schemaId || `${personUrl}#person`;

  const personObj = {
    "@type": "Person",
    "@id": personId,
    "name": founder.name,
    "url": personUrl,
    "jobTitle": founder.jobTitle || founder.role,
    "description": founder.bio || founder.firstParagraph || founder.description,
    "worksFor": organizationRef(),
    "alumniOf": organizationRef(),
    "sameAs": founder.sameAs || []
  };

  if (founder.alternateName) {
    personObj.alternateName = founder.alternateName;
  }

  personObj.image = {
    "@type": "ImageObject",
    "@id": `${personId}-image`,
    "url": imageUrl,
    "contentUrl": imageUrl,
    "caption": `${founder.name} - ${founder.jobTitle || founder.role} of Derixio`
  };

  if (Array.isArray(founder.skills) && founder.skills.length > 0) {
    personObj.knowsAbout = founder.skills;
  }

  return personObj;
}

/**
 * Builds a ProfilePage schema node.
 * @param {{
 *   url: string,
 *   name: string,
 *   description: string,
 *   personId: string
 * }} opts
 * @returns {object}
 */
export function buildProfilePageSchema({ url, name, description, personId }) {
  return {
    "@type": "ProfilePage",
    "@id": `${BASE_URL}${url}#webpage`,
    "url": `${BASE_URL}${url}`,
    "name": name,
    "description": description,
    "isPartOf": websiteRef(),
    "about": { "@id": personId },
    "mainEntity": { "@id": personId },
    "breadcrumb": { "@id": `${BASE_URL}${url}#breadcrumb` },
    "inLanguage": "en-US"
  };
}

/**
 * Builds an Article / TechArticle schema node.
 * @param {{
 *   url: string,
 *   headline: string,
 *   description: string,
 *   image: string,
 *   datePublished: string,
 *   dateModified?: string,
 *   author: object|object[],
 *   articleSection?: string,
 *   keywords?: string[],
 *   about?: object|object[],
 *   mentions?: object|object[],
 *   mainEntity?: object|object[]
 * }} article
 * @returns {object}
 */
export function buildArticleSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  articleSection = "eCommerce & Branding Insights",
  keywords = [],
  about,
  mentions,
  mainEntity
}) {
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;
  const articleUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const schemaObj = {
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    "isPartOf": { "@id": `${BASE_URL}/insights#webpage` },
    "headline": headline,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "@id": `${articleUrl}#primaryimage`,
      "url": imageUrl,
      "contentUrl": imageUrl,
      "caption": headline
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${articleUrl}#webpage`
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": author,
    "publisher": organizationRef(),
    "articleSection": articleSection,
    "keywords": Array.isArray(keywords) ? keywords.join(", ") : keywords,
    "inLanguage": "en-US"
  };

  if (about) schemaObj.about = about;
  if (mentions) schemaObj.mentions = mentions;
  if (mainEntity) schemaObj.mainEntity = mainEntity;

  return schemaObj;
}


