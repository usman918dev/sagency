/**
 * Single source of truth for all pricing / plans data.
 * Imported by both _PlansContent.js (interactive UI) and the /plans server page
 * (OfferCatalog JSON-LD schema). Update prices/features here to auto-sync both.
 */
export const pricingData = {
  "Amazon Growth": {
    basic: {
      name: "Starter",
      price: "$499",
      priceValue: 499,
      priceCurrency: "USD",
      isMonthly: false,
      description: "1 Amazon Listing Optimization",
      features: [
        "1 Product Listing Optimization",
        "Comprehensive Keyword Research",
        "Title, Bullet Points & Description Rewrite",
        "Backend Search Terms Optimization",
        "Keyword Report & 5–7 Day Delivery"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      popular: true,
      description: "Listing Optimization + A+ Content & Brand Story",
      features: [
        "Everything in Starter",
        "A+ Content (Enhanced Brand Content)",
        "Brand Story Section & Custom Graphics",
        "Management fee based on ad spend",
        "10–12 Day Delivery"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: true,
      description: "Full-Stack Amazon Growth & PPC Management",
      features: [
        "Everything in Business",
        "Full PPC Campaign Setup & Management",
        "Management fee based on ad spend",
        "Continuous Bid & Search Term Optimization",
        "Monthly Performance Reports & Strategy"
      ]
    }
  },
  "Web Development": {
    basic: {
      name: "Starter",
      price: "$500",
      priceValue: 500,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Essential Web Development Package",
      features: [
        "Up to 5 Pages Custom Next.js Site",
        "Responsive & Mobile-First Design",
        "Core Web Vitals & SEO Setup",
        "Basic CMS Integration",
        "1 Month Support & Maintenance"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      popular: true,
      description: "Complete Web Development Solution",
      features: [
        "Up to 15 Custom Pages",
        "Headless CMS Integration (Sanity / Strapi)",
        "Custom API & Third-Party Integrations",
        "Full Performance & SEO Optimization",
        "3 Months Support & Maintenance"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Tailored Web Application Architecture",
      features: [
        "Unlimited Custom Pages & Features",
        "Custom Web App & Microservices",
        "Advanced API, CRM & Database Setup",
        "Dedicated Engineering Team",
        "Ongoing Maintenance & Priority Support"
      ]
    }
  },
  "Graphic Design": {
    basic: {
      name: "Starter",
      price: "$300",
      priceValue: 300,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Essential Graphic Design Package",
      features: [
        "Logo & Visual Brand Identity",
        "10 Custom Social Media Creatives",
        "AI, PSD, PNG & PDF Source Files",
        "Up to 5 Design Revisions",
        "1 Week Turnaround Time"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      popular: true,
      description: "Complete Brand & E-Commerce Creatives",
      features: [
        "Full Brand Identity & Packaging Design",
        "Social Media & Ad Creatives Package",
        "Unlimited Revisions",
        "Complete Source Files Included",
        "Priority 3–5 Day Delivery"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Full Design Team & Branding Suite",
      features: [
        "3D Renders & Premium Packaging Design",
        "Complete Storefront & Web Assets",
        "Dedicated UI/UX & Graphic Design Team",
        "Comprehensive Brand Guidelines",
        "Unlimited Revisions & Ongoing Support"
      ]
    }
  },
  "SEO": {
    basic: {
      name: "Starter",
      price: "$300/mo",
      priceValue: 300,
      priceCurrency: "USD",
      isMonthly: true,
      description: "Essential SEO Optimization",
      features: [
        "Technical SEO Audit & Keyword Research",
        "Optimization for Up to 10 Target Keywords",
        "On-Page Content & Meta Tag Optimization",
        "Monthly Ranking & Performance Analytics Report"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: true,
      popular: true,
      description: "Complete Organic Growth & Content",
      features: [
        "Everything in Starter",
        "High-Authority Link Building & Content Creation",
        "Google Business Profile & Local SEO",
        "Bi-weekly Ranking & Traffic Analytics"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Global & Enterprise SEO Strategy",
      features: [
        "International & Technical Enterprise SEO",
        "Comprehensive Competitor & Keyword Strategy",
        "Dedicated SEO Team & Custom Dashboards",
        "Weekly Strategy Calls & Reporting"
      ]
    }
  },
  "Digital Marketing": {
    basic: {
      name: "Starter",
      price: "$400/mo",
      priceValue: 400,
      priceCurrency: "USD",
      isMonthly: true,
      description: "Targeted Paid Social & Leads",
      features: [
        "Facebook or Instagram Ad Campaign Setup",
        "Targeted Audience Research & Ad Copy",
        "Basic Email Marketing & Lead Capture",
        "Monthly Campaign Analytics Report"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: true,
      popular: true,
      description: "Multi-Platform & Funnel Growth",
      features: [
        "Multi-Platform Ads (Meta, Google, TikTok)",
        "Conversion Rate Optimization (CRO)",
        "Full Funnel Strategy & Copywriting",
        "Bi-weekly Performance Reports"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Omni-Channel Enterprise Marketing",
      features: [
        "Omni-Channel Paid Social & SEM Strategy",
        "Email Marketing Automation & Retargeting",
        "Dedicated Marketing Team & Growth Advisor",
        "Weekly Strategy Calls & Custom Dashboard"
      ]
    }
  },
  "Video & Motion Design": {
    basic: {
      name: "Starter",
      price: "$200",
      priceValue: 200,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Social Video Editing & Motion",
      features: [
        "Up to 5 Short Social Media Video Edits",
        "Custom Motion Graphics & Animated Titles",
        "Royalty-Free Music & Audio Mixing",
        "HD Export & 1 Revision Round"
      ]
    },
    standard: {
      name: "Business",
      price: "Custom Quote",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      popular: true,
      description: "Full Video Production & Ads",
      features: [
        "Up to 20 Professional Commercial Video Edits",
        "Motion Graphics & Product Promo Videos",
        "Color Grading & Professional Sound Design",
        "Priority Delivery & Unlimited Revisions"
      ]
    },
    custom: {
      name: "Enterprise",
      price: "Let's Talk",
      priceValue: null,
      priceCurrency: "USD",
      isMonthly: false,
      description: "Enterprise Production & Motion",
      features: [
        "Unlimited Video Production & Motion Graphics",
        "2D Animation & Product Launch Campaigns",
        "Dedicated Video Editor & Creative Team",
        "Ongoing Creative Support & Content Pipeline"
      ]
    }
  }
};

/** Ordered list of service category keys (matches Object.keys order) */
export const pricingCategories = Object.keys(pricingData);
