import { Zap, ShieldCheck, BarChart, Code, Search, ShoppingCart, Film } from 'lucide-react';

export const iconMap = {
  Code,
  Search,
  BarChart,
  Zap,
  ShieldCheck,
  ShoppingCart,
  Film,
};

export const servicesData = [
  {
    title: "Web Development",
    slug: "web-development",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-white">Crafting Digital Experiences That Convert</h2>
      <p>In today's <strong>digital-first world</strong>, your website is more than just an online brochure; it's your most powerful marketing asset, your 24/7 salesperson, and the central hub of your brand's universe. At <strong>Sagency</strong>, we don't just build websites; we craft immersive digital experiences that captivate audiences, drive engagement, and deliver measurable results.</p>
      <p>We specialize in building <strong>high-performance websites</strong> using modern frameworks like Next.js and React, ensuring your site is scalable, secure, and optimized for search engines from the ground up. From initial strategy and UI/UX design to back-end development and deployment, we provide a complete, end-to-end solution that grows with your business.</p>
    `,
    coverImage: "/assets/web.webp",
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
        price: "$2,499",
        features: ["Up to 5 Pages", "Responsive Design", "CMS Integration", "Basic SEO Setup", "1 Month Support"]
      },
      {
        planName: "Business",
        price: "$5,999",
        features: ["Up to 15 Pages", "Custom Design", "Advanced CMS", "Full SEO Optimization", "Analytics Integration", "3 Months Support"],
        recommended: true
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        features: ["Unlimited Pages", "Custom Web Application", "API Integrations", "Dedicated Support", "Ongoing Maintenance"]
      }
    ]
  },
  {
    title: "SEO & Content Strategy",
    slug: "seo-content-strategy",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-white">Boost Your Visibility, Drive Organic Growth</h2>
      <p><strong>Visibility</strong> is the currency of the digital age. Having a stunning website means nothing if your audience can’t find it. Our SEO & Content Strategy focuses on driving qualified organic traffic that <strong>converts</strong>, combining technical excellence with high-quality, valuable content.</p>
      <p>We start with a comprehensive digital audit to uncover opportunities and roadblocks. Then, we create a <strong>data-driven content strategy</strong> aligned with your audience's search intent and business objectives. The result: long-term, sustainable growth and a website that works for you 24/7.</p>
    `,
    coverImage: "/assets/seo1.webp",
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
        planName: "Foundation",
        price: "$1,500/mo",
        features: ["Technical Audit", "Keyword Research (50)", "On-Page SEO", "Monthly Reporting"]
      },
      {
        planName: "Growth",
        price: "$3,500/mo",
        features: ["Everything in Foundation", "Content Strategy", "2 Articles/Month", "Link Building (5/mo)", "Local SEO"],
        recommended: true
      },
      {
        planName: "Dominance",
        price: "Let's Talk",
        features: ["Full-Scale SEO", "Dedicated SEO Team", "Advanced Link Building", "Digital PR", "CRO"]
      }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: `
      <h2 class="text-3xl font-bold mb-4 text-white">Data-Driven Campaigns That Deliver Results</h2>
      <p>Achieve <strong>explosive growth</strong> with our precision-targeted digital marketing campaigns. We craft high-ROI strategies for platforms like Meta (Facebook & Instagram), Google, and TikTok, focusing on metrics that truly matter—<strong>leads, sales, and ROI</strong>.</p>
      <p>From ad creative development to A/B testing, we handle the entire campaign lifecycle, providing you with transparent reporting and actionable insights every step of the way.</p>
    `,
    coverImage: "/assets/digi.jpg",
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
        description: "A/B testing and landing page improvements to boost conversions."
      },
      {
        title: "Email Marketing & Automation",
        description: "Engage leads and retain customers with targeted email flows."
      },
      {
        title: "Funnel Strategy & Development",
        description: "Full funnel strategies that guide customers from awareness to purchase."
      },
      {
        title: "Performance Analytics",
        description: "Live dashboards with actionable insights and ROI tracking."
      }
    ],
    pricingPlans: [
      {
        planName: "Launch",
        price: "$1,200/mo",
        features: ["1 Platform (Meta or Google)", "Campaign Setup", "Ad Creative (2/mo)", "Monthly Reporting"]
      },
      {
        planName: "Scale",
        price: "$2,800/mo",
        features: ["2 Platforms", "Full Campaign Management", "A/B Testing", "Weekly Reporting", "Pixel & Event Tracking"],
        recommended: true
      },
      {
        planName: "Dominate",
        price: "Let's Talk",
        features: ["Omni-Channel Strategy", "Dedicated Ad Manager", "CRO & Landing Pages", "Marketing Automation"]
      }
    ]
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: `
    <h2 class="text-3xl font-bold mb-4 text-white">Creative Designs That Elevate Your Brand</h2>
    <p>We craft visually stunning and <strong>high-converting designs</strong> that help brands stand out in competitive markets. Whether you need <strong>3D product renders</strong>, <strong>Amazon product listing graphics</strong>, or a full Shopify store design, our team brings creativity and strategy together to deliver results.</p>
    <p>From <strong>logo design</strong> to complete brand identity, we focus on designs that not only look good but also <strong>drive engagement and sales</strong>.</p>
  `,
    coverImage: "/assets/graphic-design.jpg",
    icon: "Palette",
    features: [
      {
        title: "3D Product Design & Mockups",
        description: "Photorealistic 3D product renders to showcase your items in the best light for marketing and e-commerce."
      },
      {
        title: "Amazon Product Listing Graphics",
        description: "High-quality product images, infographics, and A+ content optimized for Amazon listings."
      },
      {
        title: "Shopify Store Design",
        description: "Custom Shopify themes and product page designs to enhance user experience and boost conversions."
      },
      {
        title: "Logo & Brand Identity",
        description: "Unique, memorable logos and cohesive brand identity packages to establish a strong visual presence."
      },
      {
        title: "Social Media Creatives",
        description: "Eye-catching visuals for platforms like Instagram, TikTok, and Facebook to engage your audience."
      },
      {
        title: "Packaging Design",
        description: "Professional packaging designs that reflect your brand and attract customers."
      },
      {
        title: "Website Graphics",
        description: "Custom website banners, icons, and graphics to create a professional online presence."
      },
      {
        title: "UI/UX Design",
        description: "Intuitive and user-friendly interfaces designed to improve user experience and retention."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$500",
        features: [
          "1 Logo Design",
          "3 Social Media Creatives",
          "1 Amazon Listing Graphic",
          "2 Revisions"
        ]
      },
      {
        planName: "Growth",
        price: "$1,200",
        features: [
          "Full Brand Identity Package",
          "5 Amazon Listing Graphics",
          "Shopify Store Design (Up to 5 Pages)",
          "5 Social Media Creatives",
          "Unlimited Revisions",
          "Source Files Included"
        ],
        recommended: true
      },
      {
        planName: "Enterprise",
        price: "Custom Quote",
        features: [
          "3D Product Renderings (Unlimited)",
          "Full Shopify Store Development",
          "Amazon A+ Content & Branding",
          "Ongoing Graphic Design Support",
          "Dedicated Designer"
        ]
      }
    ]
  },
  {
    title: "E-Commerce Development",
    slug: "ecommerce-development",
    description: `
    <h2 class="text-3xl font-bold mb-4 text-white">Build Powerful Online Stores That Sell</h2>
    <p>We create <strong>scalable and high-converting e-commerce stores</strong> tailored to your business needs. From <strong>WordPress WooCommerce</strong> setups to <strong>custom-coded online stores</strong>, we focus on delivering seamless shopping experiences with speed, security, and advanced functionality.</p>
    <p>Whether you're launching a <strong>dropshipping business</strong> or a large-scale online brand, our team handles everything — from store design and payment gateway integrations to custom feature development and performance optimization.</p>
  `,
    coverImage: "/assets/ecommerce-dev.jpg",
    icon: "ShoppingCart",
    features: [
      {
        title: "WooCommerce Development",
        description: "Custom WooCommerce stores with advanced features like subscription models, digital products, and variable pricing."
      },
      {
        title: "WordPress Store Setup",
        description: "Full WordPress setup with e-commerce-ready themes, plugins, and payment gateway integration."
      },
      {
        title: "Dropshipping Store Development",
        description: "Complete dropshipping setup with supplier integration, automated order syncing, and streamlined inventory management."
      },
      {
        title: "Custom Coded E-Commerce Solutions",
        description: "Fully bespoke stores built using modern stacks for unique business needs and high performance."
      },
      {
        title: "Payment Gateway Integration",
        description: "Seamless integration of popular payment gateways like Stripe, PayPal, and local solutions."
      },
      {
        title: "Product Management System",
        description: "Advanced product filters, categories, and inventory control for effortless management."
      },
      {
        title: "Store Performance Optimization",
        description: "Speed improvements, caching strategies, and SEO optimization to boost rankings and conversions."
      },
      {
        title: "Mobile-First Responsive Design",
        description: "Stores that look and work perfectly across all devices for an exceptional user experience."
      }
    ],
    pricingPlans: [
      {
        planName: "Starter Store",
        price: "$800",
        features: [
          "Up to 20 Products",
          "WordPress + WooCommerce Setup",
          "1 Payment Gateway Integration",
          "Responsive Design",
          "Basic SEO Optimization",
          "2 Revisions"
        ]
      },
      {
        planName: "Growth Store",
        price: "$2,000",
        features: [
          "Up to 100 Products",
          "Advanced WooCommerce Features",
          "Multi-Payment Gateway Support",
          "Dropshipping Plugin Setup",
          "Custom Homepage & Landing Pages",
          "SEO & Speed Optimization",
          "Unlimited Revisions",
          "Source Files Included"
        ],
        recommended: true
      },
      {
        planName: "Enterprise Store",
        price: "Custom Quote",
        features: [
          "Unlimited Products",
          "Custom Coded E-Commerce Platform",
          "Full Dropshipping Automation",
          "Advanced Analytics Dashboard",
          "Third-Party API Integrations",
          "Dedicated Developer Support",
          "Ongoing Maintenance & Upgrades"
        ]
      }
    ]
  }


];

/**
 * Utility function to find a service by its slug.
 */
export const getServiceBySlug = (slug) => {
  return servicesData.find(service => service.slug === slug);
};
