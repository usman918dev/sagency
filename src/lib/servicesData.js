import { Zap, ShieldCheck, BarChart, Code, Search, ShoppingCart, Film, TrendingUp, Palette } from 'lucide-react';

export const iconMap = {
  Code,
  Search,
  BarChart,
  Zap,
  ShieldCheck,
  ShoppingCart,
  Film,
  TrendingUp,
  Palette,
};

export const servicesData = [
  {
    title: "Amazon Growth",
    slug: "ecommerce-development",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">End-to-End Amazon Brand Growth</h2>
      <p>At <strong>Derixio</strong>, we don't just manage Amazon ads—we help grow your entire Amazon brand. From listing optimization and high-converting A+ Content to strategic Sponsored Ads PPC campaigns, store design, and ongoing performance reporting, we deliver complete, full-stack Amazon growth.</p>
      <p>Whether launching new products or scaling an established brand, our data-driven strategies increase product visibility, improve conversion rates, lower ACoS, and maximize overall profitability across Amazon.</p>
    `,
    coverImage: "/assets/hero-amazon.png",
    icon: "TrendingUp",
    features: [
      {
        title: "Amazon Listing Optimization",
        description: "Comprehensive keyword research, high-converting product title optimization, persuasive bullet points, rich descriptions, and backend search terms."
      },
      {
        title: "Listing Images & A+ Content",
        description: "Eye-catching listing main images, infographic slides, Enhanced Brand Content (A+), and brand story section designs."
      },
      {
        title: "Amazon Storefront Design",
        description: "Custom Amazon brand storefront design that elevates brand authority and drives multi-product customer browsing."
      },
      {
        title: "Amazon PPC & Advertising",
        description: "Data-driven campaign setup and management for Sponsored Products, Sponsored Brands, and Sponsored Display ads. (Management fee based on ad spend)"
      },
      {
        title: "Bid & Search Term Optimization",
        description: "Continuous bid adjustments, search term harvesting, negative keyword management, and competitor targeting."
      },
      {
        title: "Monthly Reports & Growth Strategy",
        description: "Transparent monthly performance reporting, ROAS tracking, and ongoing strategic Amazon growth consulting."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$499",
        features: [
          "1 Product Listing Optimization",
          "Comprehensive Keyword Research",
          "Title, Bullet Points & Description Rewrite",
          "Backend Search Terms Optimization",
          "Keyword Report & 5–7 Day Delivery"
        ]
      },
      {
        planName: "Business",
        price: "Custom Quote",
        recommended: true,
        features: [
          "Everything in Starter",
          "A+ Content (Enhanced Brand Content)",
          "Brand Story Section & Custom Graphics",
          "Management fee based on ad spend",
          "10–12 Day Delivery"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "Everything in Business",
          "Full PPC Campaign Setup & Management",
          "Management fee based on ad spend",
          "Continuous Bid & Search Term Optimization",
          "Monthly Performance Reports & Strategy"
        ]
      }
    ]
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Crafting Digital Experiences That Convert</h2>
      <p>In today's <strong>digital-first world</strong>, your website is more than just an online brochure; it's your most powerful marketing asset, your 24/7 salesperson, and the central hub of your brand's universe. At <strong>Derixio</strong>, we don't just build websites; we craft immersive digital experiences that captivate audiences, drive engagement, and deliver measurable results.</p>
      <p>We specialize in building <strong>high-performance websites</strong> using modern frameworks like Next.js and React, ensuring your site is scalable, secure, and optimized for search engines from the ground up. From initial strategy and UI/UX design to back-end development and deployment, we provide a complete, end-to-end solution that grows with your business.</p>
    `,
    coverImage: "/assets/hero-web.png",
    icon: "Code",
    features: [
      {
        title: "Custom Next.js Development",
        description: "Blazing-fast, SEO-friendly websites with server-side rendering and static site generation for optimal performance."
      },
      {
        title: "Headless CMS Integration",
        description: "Manage your content effortlessly with headless CMS like Sanity, Strapi, or Contentful."
      },
      {
        title: "API & Third-Party Integrations",
        description: "Connect your site with CRMs, automation tools, payment gateways, and more seamlessly."
      },
      {
        title: "Performance Optimization",
        description: "Optimized for Core Web Vitals, ensuring smooth UX and better SEO rankings."
      },
      {
        title: "Responsive & Accessible Design",
        description: "Flawless display across devices, meeting WCAG accessibility standards."
      },
      {
        title: "Secure & Scalable Architecture",
        description: "Websites built to grow with your business while staying protected from threats."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$500",
        features: [
          "Up to 5 Pages",
          "Custom Next.js Development",
          "Responsive & Accessible Design",
          "Basic CMS Integration",
          "Core Web Vitals Optimization",
          "1 Month Support"
        ]
      },
      {
        planName: "Business",
        price: "$1,000–$1,500",
        recommended: true,
        features: [
          "Up to 15 Pages",
          "Custom Next.js Development",
          "Headless CMS Integration (Sanity, Strapi, or Contentful)",
          "API & Third-Party Integrations",
          "Full Performance Optimization",
          "Secure & Scalable Architecture",
          "3 Months Support"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "Unlimited Pages",
          "Custom Web Application Architecture",
          "Advanced API & CRM Integrations",
          "Enterprise-Grade Security & Scalability",
          "Dedicated Engineering Team",
          "Ongoing Maintenance & Support"
        ]
      }
    ]
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: `
    <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Creative Designs That Elevate Your Brand</h2>
    <p>We craft visually stunning and <strong>high-converting designs</strong> that help brands stand out in competitive markets. From photorealistic <strong>3D product renders</strong> to custom <strong>branding suites</strong>, packaging, and digital marketing visuals, our team brings creativity and strategy together to deliver results.</p>
    <p>From <strong>logo design</strong> to complete brand identity, we focus on designs that not only look good but also <strong>drive engagement and trust</strong>.</p>
  `,
    coverImage: "/assets/hero-graphic.png",
    icon: "Palette",
    features: [
      {
        title: "3D Product Design & Mockups",
        description: "Photorealistic 3D product renders to showcase your items in the best light for marketing and e-commerce."
      },
      {
        title: "Shopify Store & Web Graphics",
        description: "Custom banners, product visuals, and UI elements designed to elevate your online store."
      },
      {
        title: "Logo & Brand Identity",
        description: "Distinctive logos, typography, color palettes, and brand guidelines for a strong identity."
      },
      {
        title: "Social Media & Ad Creatives",
        description: "Eye-catching social media posts, stories, and ad creatives designed to drive clicks."
      },
      {
        title: "Packaging & Print Design",
        description: "Professional product packaging, labels, brochures, and print marketing materials."
      },
      {
        title: "UI/UX Design",
        description: "Intuitive and user-friendly interfaces designed to improve user experience and retention."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$300",
        features: [
          "Logo & Brand Identity",
          "10 Social Media Creatives",
          "Up to 5 Design Revisions",
          "Basic Source Files",
          "1 Week Turnaround",
          "1 Month Support"
        ]
      },
      {
        planName: "Business",
        price: "$500–$700",
        recommended: true,
        features: [
          "Packaging Design",
          "Logo & Brand Identity",
          "10 Social Media Creatives",
          "Unlimited Revisions",
          "AI, PSD, PNG & PDF Source Files",
          "Priority 3–5 Day Delivery",
          "1 Month Support"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "3D Product Design",
          "Shopify Store Design",
          "Branding",
          "Social Media Design",
          "Packaging Design",
          "Website Graphics",
          "UI/UX Design",
          "Dedicated Design Team",
          "Brand Guidelines",
          "Unlimited Revisions"
        ]
      }
    ]
  },
  {
    title: "Search Engine Optimization",
    slug: "seo-content-strategy",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Boost Your Visibility, Drive Organic Growth</h2>
      <p><strong>Visibility</strong> is the currency of the digital age. Having a stunning website means nothing if your audience can’t find it. Our Search Engine Optimization focuses on driving qualified organic traffic that <strong>converts</strong>, combining technical excellence with high-quality, valuable content.</p>
      <p>We start with a comprehensive digital audit to uncover opportunities and roadblocks. Then, we create a <strong>data-driven content strategy</strong> aligned with your audience's search intent and business objectives. The result: long-term, sustainable growth and a website that works for you 24/7.</p>
    `,
    coverImage: "/assets/hero-seo.png",
    icon: "Search",
    features: [
      {
        title: "Technical SEO Audit",
        description: "In-depth analysis of speed, crawlability, schema, and mobile-friendliness."
      },
      {
        title: "Keyword Research & Mapping",
        description: "Identify high-intent keywords and map them to strategic content plans."
      },
      {
        title: "Content Creation & Optimization",
        description: "Produce engaging, optimized content for both search engines and users."
      },
      {
        title: "Link Building & Outreach",
        description: "Ethical outreach strategies to earn high-authority backlinks."
      },
      {
        title: "Local SEO",
        description: "Optimize Google Business Profile and dominate local searches."
      },
      {
        title: "Analytics & Reporting",
        description: "Data-driven insights on rankings, traffic, and conversions."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$300/mo",
        features: [
          "Technical SEO Audit",
          "Keyword Research",
          "Up to 10 Keywords",
          "Content Optimization",
          "Monthly Analytics Report"
        ]
      },
      {
        planName: "Business",
        price: "$600–$800/mo",
        recommended: true,
        features: [
          "Everything in Starter",
          "Content Creation",
          "Link Building",
          "Local SEO",
          "Google Business Profile Optimization",
          "Bi-weekly Reports"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "International SEO",
          "Technical SEO",
          "Enterprise SEO Strategy",
          "Dedicated SEO Team",
          "Custom Dashboards",
          "Monthly Strategy Calls"
        ]
      }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Data-Driven Campaigns That Deliver Results</h2>
      <p>Achieve <strong>explosive growth</strong> with our precision-targeted digital marketing campaigns. We craft high-ROI strategies for platforms like Meta (Facebook & Instagram), Google, and TikTok, focusing on metrics that truly matter—<strong>leads, sales, and ROI</strong>.</p>
      <p>From ad creative development to A/B testing, we handle the entire campaign lifecycle, providing you with transparent reporting and actionable insights every step of the way.</p>
    `,
    coverImage: "/assets/hero-digital.png",
    icon: "BarChart",
    features: [
      {
        title: "Paid Social Campaigns",
        description: "Facebook, Instagram, LinkedIn, and TikTok campaigns for precise targeting."
      },
      {
        title: "Search Engine Marketing (SEM)",
        description: "Google Ads campaigns targeting high-intent searchers."
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "Improve landing pages and user flows to boost conversions."
      },
      {
        title: "Email & Funnel Marketing",
        description: "Nurture leads and drive repeat business with automated funnels."
      },
      {
        title: "Analytics & Reporting",
        description: "Live dashboards with actionable insights and ROI tracking."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$400/mo",
        features: [
          "Facebook or Instagram Ads",
          "Basic Email Marketing",
          "Monthly Analytics",
          "Client Ad Budget"
        ]
      },
      {
        planName: "Business",
        price: "$800–$1,000/mo",
        recommended: true,
        features: [
          "Multi-platform Ads",
          "Google Ads Management",
          "Conversion Rate Optimization",
          "Funnel Strategy",
          "Bi-weekly Reports"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "Full Funnel Marketing",
          "Paid Social",
          "SEM",
          "Email Marketing",
          "CRO",
          "Dedicated Marketing Team",
          "Weekly Strategy Calls"
        ]
      }
    ]
  },
  {
    title: "Video & Motion Design",
    slug: "video-editing",
    description: `
    <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Video & Motion Design</h2>
    <p>Capture attention in the first three seconds with <strong>high-impact visual storytelling</strong>, motion graphics, and conversion-focused video editing.</p>
  `,
    coverImage: "/assets/hero-video.png",
    icon: "Film",
    features: [
      {
        title: "Social Media Video Editing",
        description: "Professional short-form and long-form videos for Instagram, Facebook, TikTok, LinkedIn, and YouTube. Includes engaging edits, captions, transitions, and platform-optimized content designed to increase reach and engagement.",
        icon: "Film"
      },
      {
        title: "Ad Creative Videos",
        description: "High-converting promotional videos for Meta Ads, Google Ads, TikTok Ads, Amazon Ads, and eCommerce campaigns. Designed to capture attention, improve click-through rates, and maximize conversions.",
        icon: "Zap"
      },
      {
        title: "Motion Graphics",
        description: "2D and 3D animated graphics, kinetic typography, animated logos, and visual effects that make your videos look professional and engaging.",
        icon: "BarChart"
      },
      {
        title: "Brand & Promotional Videos",
        description: "High-quality brand stories, corporate videos, product teasers, and promotional content designed to build trust and elevate your brand image.",
        icon: "ShieldCheck"
      },
      {
        title: "Amazon Video Editing",
        description: "High-converting product videos optimized for Amazon listings and Amazon Video Ads to boost conversions.",
        icon: "ShoppingCart"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$200",
        features: [
          "Social Media Video Editing",
          "Up to 5 Short Videos",
          "Basic Motion Graphics",
          "Royalty-Free Music",
          "HD Export",
          "1 Revision"
        ]
      },
      {
        planName: "Business",
        price: "$400–$500",
        recommended: true,
        features: [
          "Up to 20 Professional Videos",
          "Motion Graphics",
          "Commercial Ad Creatives",
          "Brand Promo Videos",
          "Amazon Product Videos",
          "Color Grading",
          "Sound Design",
          "Priority Delivery",
          "Unlimited Revisions"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: [
          "Unlimited Video Production",
          "Commercial Campaigns",
          "Motion Graphics",
          "2D Animation",
          "Amazon Listing Videos",
          "Product Launch Videos",
          "Dedicated Video Editor",
          "Monthly Content Production",
          "Ongoing Creative Support"
        ]
      }
    ]
  }
];

export const getServiceBySlug = (slug) => {
  return servicesData.find(service => service.slug === slug);
};
