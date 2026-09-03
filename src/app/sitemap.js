import { getAllArticleSlugs } from "@/lib/insightsData";

export default async function sitemap() {
  const baseUrl = "https://www.derixio.com";
  const currentDate = new Date().toISOString().split("T")[0];

  // Base static and category routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/portfolio/amazon-growth",
    "/portfolio/graphic-designing",
    "/portfolio/amazon-ppc",
    "/plans",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/team/muhammad-usman",
    "/team/muhammad-sajjad",
    "/services/web-development",
    "/services/graphic-designing",
    "/services/digital-marketing",
    "/services/seo-content-strategy",
    "/services/ecommerce-development",
    "/services/video-editing",
    "/insights",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : route.startsWith("/team/") || route.startsWith("/services") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/team/") ? 0.9 : 0.8,
  }));

  // Dynamic Insight article routes
  const articleSlugs = getAllArticleSlugs();
  const articleRoutes = articleSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...articleRoutes];
}
