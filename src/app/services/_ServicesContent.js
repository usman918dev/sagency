"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionHeader from '@/ui/sectionheader/SectionHeader';
import Mockup, { DevMockup, DigitalMockup, LandingMockup, AmazonPPCMockup, VideoEditingMockup } from '@/ui/mockup/Mockup';

const services = [
  {
    id: 1,
    title: "Amazon Growth",
    short: "From Amazon store optimization, listing copy, and A+ Content to high-converting PPC advertising campaigns and ongoing optimization, Derixio manages your complete Amazon growth journey to scale sales and maximize profitability.",
    bullets: [
      "Listing & Copy Optimization",
      "A+ Content & Brand Story",
      "PPC Advertising & Bidding",
      "Storefront Design & Scaling"
    ],
    imageSrc: <AmazonPPCMockup/>,
    alt: "Amazon Growth performance dashboard showing listing optimization and PPC analytics"
  },
  {
    id: 2,
    title: "Web Development",
    short: "Your website is your 24/7 digital storefront, and we ensure it is built to perform. We develop lightning-fast, secure, and scalable websites using modern frameworks like React and Next.js. We focus on clean code architecture and responsive interfaces to ensure your site not only looks professional but performs flawlessly under high traffic conditions on any device.",
    bullets: [
      "Full-Stack Development",
      "Responsive Design",
      "Speed Optimization",
      "API Integration"
    ],
    imageSrc: <DevMockup/>,
    alt: "Modern web development code and responsive interface layout"
  },
  {
    id: 3,
    title: "Graphic Designing",
    short: "Visuals speak louder than text, and our design team ensures your brand captures attention instantly. We create stunning, brand-centric assets that communicate your unique value proposition. Whether it is a complete brand identity overhaul, a logo, 3D product renders, packaging, or daily social media creatives, we ensure every pixel aligns perfectly with your marketing goals.",
    bullets: [
      "Brand Identity & Logos",
      "3D Renders & Packaging",
      "Marketing Creatives",
      "UI/UX & Web Assets"
    ],
    imageSrc: <Mockup/>,
    alt: "Graphic design workspace featuring creative tools and color palettes"
  },
  {
    id: 4,
    title: "SEO",
    short: "Dominate search results and drive organic traffic that actually converts into sales. We move beyond basic keywords to implement a holistic SEO strategy that covers technical site health, on-page content optimization, and authority building. We help your brand claim the top spot for search terms that matter to your bottom line, ensuring sustainable long-term growth.",
    bullets: [
      "Technical Audits",
      "Keyword Strategy",
      "On-Page Optimization",
      "Backlink Building"
    ],
    imageSrc: <LandingMockup/>,
    alt: "SEO analytics chart showing keyword ranking improvements"
  },
  {
    id: 5,
    title: "Digital Marketing & Strategy",
    short: "We don't just post content; we build thriving communities around your brand. Our data-driven approach analyzes your specific audience to create a bespoke strategy that turns passive scrollers into loyal advocates. From detailed content calendars to real-time engagement, we handle every digital touchpoint to ensure your brand voice remains consistent and engaging across all platforms.",
    bullets: [
      "Audience Analysis",
      "Content Strategy",
      "Paid Social Campaigns",
      "Performance Analytics"
    ],
    imageSrc: <DigitalMockup/>,
    alt: "Digital marketing strategy and social media analytics dashboard"
  },
  {
    id: 6,
    title: "Video Editing & Animation",
    short: "Capture attention in the first three seconds with high-impact visual storytelling. Our production team transforms raw footage into compelling narratives perfect for Reels, TikToks, and commercial ads. We combine dynamic cuts, smooth transitions, motion graphics, and professional sound design to increase viewer retention and drive your message home effectively.",
    bullets: [
      "Professional Editing",
      "Motion Graphics",
      "Color Grading",
      "Sound Design"
    ],
    imageSrc: <VideoEditingMockup/>,
    alt: "Video editing timeline software with motion effects"
  }
];

export default function ServicesContent() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid text-[var(--foreground)]">
      {/* Hero Section */}
      <div className="pt-4 md:pt-6 pb-20 text-center relative z-10 g-px">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[#9D26FF] text-xs font-bold uppercase tracking-widest mb-4">
          <span>DERIXIO CORE CAPABILITIES</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--foreground-heading)] leading-tight tracking-tight mb-6">
          Beyond Amazon, <br />
          <span className="text-[#9D26FF]">
            We've Got You Covered
          </span>
        </h1>
        <p className="text-[var(--foreground-muted)] text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Explore our comprehensive suite of software development, digital marketing, brand design, and e-commerce solutions.
        </p>
        <button
          onClick={scrollToContact}
          className="px-8 py-4 rounded-2xl bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold shadow-xl transition-all duration-300 hover:scale-105"
        >
          Schedule a Strategy Call
        </button>

        {/* Single Trust Badge below main heading/CTA button */}
        <div className="mt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--background-alt)] border border-[var(--border)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#9D26FF] font-bold uppercase tracking-widest">
              Trusted by 50+ Global Brands
            </span>
          </div>
        </div>
      </div>

      {/* Services Sections */}
      {services.map((service, index) => (
        <ServiceSection
          key={service.id}
          service={service}
          inverted={index % 2 === 1}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </main>
  );
}

function ServiceSection({ service, inverted, prefersReducedMotion }) {
  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--card)]">
      <div className="absolute inset-0">
        <div className={`absolute ${inverted ? 'top-1/4 right-1/4' : 'bottom-1/4 left-1/4'} w-64 h-64 bg-[#9D26FF]/10 rounded-full blur-3xl`}></div>
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
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground-heading)] mb-4">
                    {service.title}
                  </h2>
                </div>

                <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
                  {service.short}
                </p>

                <ul className="grid grid-cols-2 gap-3">
                  {service.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-center text-[var(--foreground-muted)] text-sm">
                      <svg className="w-4 h-4 text-[#9D26FF] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center text-[#9D26FF] font-bold text-sm hover:underline transition-all duration-200 group uppercase tracking-wider"
                >
                  Request Proposal
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
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-[var(--background-alt)] backdrop-blur-md">
                  {service.imageSrc}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
