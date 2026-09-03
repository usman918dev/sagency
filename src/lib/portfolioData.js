export const serviceCategoryCards = [
  {
    name: "Amazon Growth",
    slug: "amazon-growth",
    altSlugs: ["amazon-ppc", "amazon-brand-growth"],
    image: "/assets/portfolio-amazon-v4.jpg",
    description: "Complete Amazon brand growth: listing optimization, A+ Content, brand storefronts, Sponsored Ads PPC management, and sales scaling.",
    projectCount: "Featured Case Studies"
  },
  {
    name: "Web Development",
    slug: "web-development",
    altSlugs: ["web-design"],
    image: "/assets/portfolio-web-v4.jpg",
    description: "High-performance Next.js web engineering, headless storefronts, enterprise SaaS portals, and custom web applications.",
    projectCount: "3 Featured Projects"
  },
  {
    name: "Graphic Design",
    slug: "graphic-designing",
    altSlugs: ["graphic-design", "branding-identity"],
    image: "/assets/portfolio-graphic-v4.jpg",
    description: "3D product renders, brand design systems, vector logos, typography guidelines, packaging, and complete visual identity suites.",
    projectCount: "3 Featured Projects"
  },
  {
    name: "SEO",
    slug: "seo",
    altSlugs: ["seo-engine"],
    image: "/assets/portfolio-seo-v4.jpg",
    description: "Technical SEO audits, organic search engine acceleration, high-DA backlink strategies, and search visibility growth.",
    projectCount: "2 Featured Projects"
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    altSlugs: [],
    image: "/assets/portfolio-digital-v4.jpg",
    description: "High-ROI paid ad campaigns, multi-channel growth funnels, Meta/Google Ads optimization, and lead generation visual engines.",
    projectCount: "2 Featured Projects"
  },
  {
    name: "Video & Motion Design",
    slug: "video-motion-design",
    altSlugs: ["video-editing", "video-motion"],
    image: "/assets/portfolio-video-v4.jpg",
    description: "Kinetic motion graphics, 3D animated product reels, commercial ad creative editing, high-impact video thumbnails, and Reels/Shorts.",
    projectCount: "2 Featured Projects"
  }
];

export const portfolioProjects = [];

export function getCategoryBySlug(slug) {
  return serviceCategoryCards.find(c => c.slug === slug || (c.altSlugs && c.altSlugs.includes(slug)));
}

export function getProjectsByCategorySlug(categorySlug) {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return [];
  return portfolioProjects.filter(p => p.categorySlug === cat.slug || p.categorySlug === categorySlug);
}

export function getProjectBySlug(slug) {
  return portfolioProjects.find(p => p.slug === slug);
}
