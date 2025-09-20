"use client";
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const services = [
  {
    id: 1,
    title: "Social Media Management",
    short: "Audience growth, content calendar, community engagement & monthly reporting.",
    bullets: ["Strategy", "Post Creation", "Scheduling", "Community Management", "Analytics"],
    imageSrc: "/images/social-media.webp",
    alt: "Social media management dashboard with analytics"
  },
  {
    id: 2,
    title: "Graphic Designing",
    short: "Brand identity, marketing creatives, print & digital assets.",
    bullets: ["Logo & Identity", "Social Creatives", "Brochures", "UI Assets"],
    imageSrc: "/images/graphic-design.webp",
    alt: "Graphic design workspace with creative assets"
  },
  {
    id: 3,
    title: "Paid Ads & Media Buying",
    short: "ROI-focused ad campaigns across Meta, Google & TikTok with A/B testing.",
    bullets: ["Strategy", "Creative Optimization", "Budget Management", "Reporting"],
    imageSrc: "/images/paid-ads.webp",
    alt: "Digital advertising campaign dashboard"
  },
  {
    id: 4,
    title: "Website Development",
    short: "Fast, SEO-friendly websites — static & dynamic, React/Next.js builds.",
    bullets: ["Responsive Design", "CMS Integration", "Performance", "Deployment"],
    imageSrc: "/images/web-development.webp",
    alt: "Modern website development workspace"
  },
  {
    id: 5,
    title: "SEO",
    short: "Technical + content SEO for organic growth and higher SERP rankings.",
    bullets: ["Audit", "On-page", "Technical Fixes", "Backlink Strategy"],
    imageSrc: "/images/seo.webp",
    alt: "SEO analytics and keyword research tools"
  },
  {
    id: 6,
    title: "Shopify Development",
    short: "Full Shopify setup, custom themes & app integrations for e-commerce.",
    bullets: ["Theme Dev", "Payment Setup", "Shipping", "App Integrations"],
    imageSrc: "/images/shopify.webp",
    alt: "Shopify e-commerce store development"
  },
  {
    id: 7,
    title: "Video Editing & 2D Animation",
    short: "Short form ads, explainer videos & 2D animations for brand storytelling.",
    bullets: ["Editing", "Motion Graphics", "Storyboarding", "Export for Web/Ads"],
    imageSrc: "/images/video-editing.webp",
    alt: "Video editing software with timeline and effects"
  }
];

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Agency Name",
  "description": "Professional digital services for growing brands",
  "services": services.map(service => ({
    "@type": "Service",
    "name": service.title,
    "description": service.short
  }))
};

export default function ServicesPage() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToContact = () => {
    // Replace with your contact section ID or external link
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Services — Your Agency Name | Social Media, Design, Web & More</title>
        <meta 
          name="description" 
          content="Professional digital services: Social Media, Graphic Design, Paid Ads, Web Dev, SEO, Shopify & Video. Strategy-driven results for growing brands."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative px-6 py-20 text-center bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
            >
              Services that scale your brand
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.9, 0.3, 1] }}
            >
              Strategic digital services — from creative design to growth-focused ads. We build, launch and optimize.
            </motion.p>
            <motion.button
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.9, 0.3, 1] }}
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
              whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
            >
              Schedule a Free Audit
            </motion.button>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service, index) => (
          <ServiceSection 
            key={service.id}
            service={service}
            inverted={index % 2 === 1}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Testimonial Section (after 3rd service) */}
        <TestimonialSection prefersReducedMotion={prefersReducedMotion} />

        {/* Contact CTA Section */}
        <section id="contact" className="px-6 py-20 bg-gray-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to grow your brand?</h2>
            <p className="text-xl text-gray-300 mb-8">Let's discuss how we can help scale your business with our proven strategies.</p>
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg">
              Book a Free Consultation
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

function ServiceSection({ service, inverted, prefersReducedMotion }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-gray-100">
      <div className="min-h-[50vh] max-h-[600px] flex items-center">
        <div className="w-full px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${inverted ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Text Content */}
              <motion.div 
                className={`space-y-6 ${inverted ? 'lg:col-start-2' : ''}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { 
                  opacity: 0, 
                  x: inverted ? 40 : -40 
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    Trusted by 50+ brands
                  </p>
                </div>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {service.short}
                </p>
                
                <ul className="grid grid-cols-2 gap-2">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                >
                  Get a Quote
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>

              {/* Image */}
              <motion.div 
                className={`relative ${inverted ? 'lg:col-start-1' : ''}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { 
                  opacity: 0, 
                  x: inverted ? -40 : 40 
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-300"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyydH//2Q=="
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ prefersReducedMotion }) {
  return (
    <motion.section 
      className="px-6 py-16 bg-gray-50"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
          "Working with this agency transformed our digital presence. Our social media engagement increased by 340% in just 3 months."
        </blockquote>
        <cite className="text-gray-600">
          — Sarah Johnson, Marketing Director at TechFlow
        </cite>
        
        {/* Client Logos */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Client Logo {i}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}