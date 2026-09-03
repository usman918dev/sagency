import React from "react";
import { notFound } from "next/navigation";
import { getAmazonPpcCaseStudyBySlug } from "@/lib/amazonPpcStore";
import AmazonPpcCaseStudyView from "@/components/portfolio/AmazonPpcCaseStudyView";
import {
  buildJsonLd,
  buildBreadcrumb,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getAmazonPpcCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Derixio",
      description: "The requested Amazon PPC case study could not be found."
    };
  }

  const pageUrl = `https://www.derixio.com/portfolio/amazon-ppc/case-study/${caseStudy.slug}`;

  return {
    title: `${caseStudy.title} | Amazon PPC Case Study | Derixio`,
    description: (caseStudy.summary || caseStudy.title).substring(0, 155),
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${caseStudy.title} | Derixio`,
      description: caseStudy.summary,
      url: pageUrl,
      siteName: "Derixio",
      images: [{ url: caseStudy.coverImageUrl.startsWith('http') ? caseStudy.coverImageUrl : `https://www.derixio.com${caseStudy.coverImageUrl}`, width: 1200, height: 630, alt: caseStudy.title }],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} | Derixio`,
      description: caseStudy.summary,
      images: [caseStudy.coverImageUrl.startsWith('http') ? caseStudy.coverImageUrl : `https://www.derixio.com${caseStudy.coverImageUrl}`],
    },
  };
}

export default async function AmazonPpcCaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getAmazonPpcCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const pageUrl = `/portfolio/amazon-ppc/case-study/${caseStudy.slug}`;

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: "Amazon PPC Management", url: "/portfolio/amazon-ppc" },
    { name: caseStudy.title, url: pageUrl },
  ]);

  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${BASE_URL}${pageUrl}#creative-work`,
    "name": caseStudy.title,
    "description": caseStudy.summary,
    "url": `${BASE_URL}${pageUrl}`,
    "image": caseStudy.coverImageUrl.startsWith('http') ? caseStudy.coverImageUrl : `${BASE_URL}${caseStudy.coverImageUrl}`,
    "creator": organizationRef(),
    "provider": organizationRef(),
    "genre": "Amazon PPC Management",
  };

  const jsonLd = buildJsonLd([breadcrumb, creativeWork]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmazonPpcCaseStudyView caseStudy={caseStudy} />
    </>
  );
}
