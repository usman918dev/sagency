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
        imageSrc: "/assets/graphic.jpg",
    alt: "Social media management dashboard with analytics"
  },
  {
    id: 2,
    title: "Graphic Designing",
    short: "Brand identity, marketing creatives, print & digital assets.",
    bullets: ["Logo & Identity", "Social Creatives", "Brochures", "UI Assets"],
    imageSrc: "/assets/graphic.jpg",
    alt: "Graphic design workspace with creative assets"
  },
  {
    id: 3,
    title: "Paid Ads & Media Buying",
    short: "ROI-focused ad campaigns across Meta, Google & TikTok with A/B testing.",
    bullets: ["Strategy", "Creative Optimization", "Budget Management", "Reporting"],
    imageSrc: "/assets/digital.webp",
    alt: "Digital advertising campaign dashboard"
  },
  {
    id: 4,
    title: "Website Development",
    short: "Fast, SEO-friendly websites — static & dynamic, React/Next.js builds.",
    bullets: ["Responsive Design", "CMS Integration", "Performance", "Deployment"],
        imageSrc: "/assets/wy.webp",
    alt: "Modern website development workspace"
  },
  {
    id: 5,
    title: "SEO",
    short: "Technical + content SEO for organic growth and higher SERP rankings.",
    bullets: ["Audit", "On-page", "Technical Fixes", "Backlink Strategy"],
        imageSrc: "/assets/seo.webp",
    alt: "SEO analytics and keyword research tools"
  },
  {
    id: 6,
    title: "Shopify Development",
    short: "Full Shopify setup, custom themes & app integrations for e-commerce.",
    bullets: ["Theme Dev", "Payment Setup", "Shipping", "App Integrations"],
        imageSrc: "/assets/graphic.jpg",
    alt: "Shopify e-commerce store development"
  },
  {
    id: 7,
    title: "Video Editing & 2D Animation",
    short: "Short form ads, explainer videos & 2D animations for brand storytelling.",
    bullets: ["Editing", "Motion Graphics", "Storyboarding", "Export for Web/Ads"],
        imageSrc: "/assets/video.jpg",
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

      <main className="min-h-screen bg-[#0D1117] pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-20 text-center bg-[#0D1117] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
            >
              Services that scale your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                brand
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.9, 0.3, 1] }}
            >
              Strategic digital services — from creative design to growth-focused ads. We build, launch and optimize.
            </motion.p>
            <motion.button
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
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
        <section id="contact" className="px-6 py-20 bg-[#0D1117] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to grow your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                brand?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">Let's discuss how we can help scale your business with our proven strategies.</p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
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
    <section className="relative overflow-hidden border-b border-gray-800/50 bg-[#0D1117]">
      <div className="absolute inset-0">
        <div className={`absolute ${inverted ? 'top-1/4 right-1/4' : 'bottom-1/4 left-1/4'} w-64 h-64 bg-orange-500/3 rounded-full blur-2xl`}></div>
      </div>
      <div className="min-h-[50vh] max-h-[600px] flex items-center relative z-10">
        <div className="w-full px-6 py-16">
          <div className="g-px">
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
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-orange-400 font-medium mb-4">
                    Trusted by 50+ brands
                  </p>
                </div>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {service.short}
                </p>
                
                <ul className="grid grid-cols-2 gap-2">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center text-orange-400 font-semibold hover:text-orange-300 transition-colors duration-200 group"
                >
                  Get a Quote
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
                  <Image
                    src={service.imageSrc}
                    alt={service.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
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
      className="px-6 py-16 bg-gray-900/30 backdrop-blur-sm border-y border-gray-800/50 relative overflow-hidden"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-6">
          "Working with this agency transformed our digital presence. Our social media engagement increased by{" "}
          <span className="text-orange-400 font-bold">340%</span> in just 3 months."
        </blockquote>
        <cite className="text-gray-400">
          — Sarah Johnson, Marketing Director at TechFlow
        </cite>
        
        {/* Client Logos */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:border-orange-500/30 transition-colors duration-200">
              <span className="text-gray-500 text-sm">Client Logo {i}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}