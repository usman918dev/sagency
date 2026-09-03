"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Globe,
  Cookie,
  UserCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const LAST_UPDATED = "August 2025";

const sections = [
  {
    id: "overview",
    icon: Shield,
    title: "Overview",
    content: `Derixio ("we", "our", "us") is a digital agency based in Lahore, Pakistan. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit www.derixio.com, contact us, or engage us for digital services.\n\nBy using our website or services you agree to the practices described in this policy. If you do not agree, please discontinue use of our website and services.`,
  },
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    bullets: [
      {
        heading: "Information You Provide Directly",
        items: [
          "Full name, email address, phone number, and company name submitted via contact or inquiry forms.",
          "Project requirements, briefs, and any files you share during onboarding or active projects.",
          "Payment and billing details processed securely through third-party payment processors (Derixio does not store raw card data).",
          "Communications you send us via email, WhatsApp, or any other messaging channel.",
        ],
      },
      {
        heading: "Information Collected Automatically",
        items: [
          "Browser type, operating system, IP address, and device identifiers when you visit our website.",
          "Pages visited, time on page, referring URL, and click events collected via analytics tools.",
          "Cookies and similar tracking technologies (see the Cookie Policy section below).",
        ],
      },
      {
        heading: "Information From Third Parties",
        items: [
          "Social media profile data if you contact us through Facebook, Instagram, or LinkedIn.",
          "Referral information from partners or affiliate channels.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "How We Use Your Information",
    bullets: [
      {
        heading: "Service Delivery",
        items: [
          "To onboard you as a client and deliver the agreed digital services.",
          "To send weekly project status updates, milestone reports, and deliverable previews.",
          "To communicate revisions, feedback, and approval requests throughout the project.",
          "To process payments and issue invoices.",
        ],
      },
      {
        heading: "Business Operations",
        items: [
          "To respond to inquiries and support requests in a timely manner.",
          "To maintain records of contracts, deliverables, and communications.",
          "To improve our website performance and user experience based on analytics.",
          "To detect, prevent, and address technical issues or fraudulent activity.",
        ],
      },
      {
        heading: "Marketing (Only With Consent)",
        items: [
          "To send newsletters, case studies, or promotional offers if you have opted in.",
          "You may unsubscribe from marketing communications at any time via the unsubscribe link in any email.",
        ],
      },
    ],
  },
  {
    id: "data-sharing",
    icon: Globe,
    title: "How We Share Your Information",
    content: `Derixio does not sell, rent, or trade your personal data to third parties. We share information only in the following limited circumstances:`,
    bullets: [
      {
        heading: "Service Providers",
        items: [
          "Trusted third-party tools such as hosting providers, email platforms, cloud storage, and analytics services — all bound by strict data-processing agreements.",
          "Payment processors (e.g., Stripe, PayPal) who handle transactions under their own security standards.",
        ],
      },
      {
        heading: "Legal Requirements",
        items: [
          "When required by law, court order, or governmental authority.",
          "To protect the rights, property, or safety of Derixio, our clients, or the public.",
        ],
      },
      {
        heading: "Business Transfers",
        items: [
          "In the event of a merger, acquisition, or sale of company assets, client data may be transferred to the successor entity, and you will be notified.",
        ],
      },
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your personal data:\n\n• SSL/TLS encryption on all data transmission between your browser and our servers.\n• Role-based access controls so only authorised team members can access project data.\n• Regular security audits and software updates.\n• Secure cloud storage with encrypted backups.\n\nWhile we take every reasonable precaution, no method of internet transmission is 100% secure. If you believe your data has been compromised, contact us immediately at hello@derixio.com.`,
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookie Policy",
    content: `We use cookies and similar technologies to enhance your experience on our website.\n\nTypes of cookies we use:\n\n• Essential Cookies — required for core website functionality (navigation, form submissions). These cannot be disabled.\n• Analytics Cookies — help us understand how visitors interact with our site (e.g., Google Analytics). Collected data is aggregated and anonymised.\n• Marketing Cookies — used only with your explicit consent to personalise content or ads.\n\nYou can control non-essential cookies via your browser settings. Note that disabling cookies may affect some features of our website.`,
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    content: `Depending on your jurisdiction (including GDPR for EU/UK residents, and applicable Pakistani data protection standards), you have the right to:`,
    bullets: [
      {
        heading: "",
        items: [
          "Access the personal data we hold about you.",
          "Request correction of inaccurate or incomplete data.",
          "Request deletion of your personal data (subject to legal retention requirements).",
          "Object to or restrict how we process your data.",
          "Withdraw consent for marketing communications at any time.",
          "Request a portable copy of your data in a structured, machine-readable format.",
          "Lodge a complaint with a relevant data protection authority in your country.",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    icon: Database,
    title: "Data Retention",
    content: `We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy:\n\n• Active clients: data retained for the duration of the engagement plus 3 years after project completion for record-keeping.\n• Inquiry data: retained for 12 months if no project commences.\n• Marketing data: retained until you unsubscribe or request deletion.\n• Financial records: retained for 7 years as required by applicable accounting and tax regulations.\n\nAfter the applicable retention period, your data is securely deleted or anonymised.`,
  },
  {
    id: "children",
    icon: AlertCircle,
    title: "Children's Privacy",
    content: `Our services are not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately and we will delete it promptly.`,
  },
  {
    id: "third-party-links",
    icon: ExternalLink,
    title: "Third-Party Links",
    content: `Our website may contain links to external websites or social media platforms. Derixio is not responsible for the privacy practices or content of those third-party sites. We encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    id: "changes",
    icon: AlertCircle,
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we do, we will update the "Last Updated" date at the top of this page. For significant changes, we will notify active clients via email. Continued use of our website or services after an update constitutes acceptance of the revised policy.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:\n\nDerixio\nEmail: hello@derixio.com\nPhone: +92 302 4165348\nLahore, Pakistan\nBusiness Hours: Monday – Friday, 9:00 AM – 6:00 PM (PKT)\n\nWe aim to respond to all data-related inquiries within 5 business days.`,
  },
];

function AccordionSection({ section, isOpen, onToggle }) {
  const Icon = section.icon;
  return (
    <motion.div
      initial={false}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-colors shadow-md"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-[var(--card-hover)] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[var(--background-alt)] border border-[var(--border)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-[#9D26FF] transition-colors">
            <Icon className="w-5 h-5 text-[#9D26FF]" />
          </div>
          <span className="text-[var(--foreground-heading)] font-bold text-base sm:text-lg">{section.title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#9D26FF] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0 group-hover:text-[#9D26FF] transition-colors" />
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-6 pt-0"
        >
          <div className="pl-14">
            {section.content && (
              <p className="text-[var(--foreground-muted)] text-sm leading-relaxed whitespace-pre-line mb-4">
                {section.content}
              </p>
            )}
            {section.bullets &&
              section.bullets.map((group, gi) => (
                <div key={gi} className="mb-4">
                  {group.heading && (
                    <h4 className="text-[#9D26FF] text-xs font-bold uppercase tracking-wider mb-2">
                      {group.heading}
                    </h4>
                  )}
                  <ul className="space-y-2">
                    {group.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2.5 text-[var(--foreground-muted)] text-sm">
                        <div className="w-1.5 h-1.5 bg-[#9D26FF] rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PrivacyContent() {
  const [openSection, setOpenSection] = useState("overview");

  const toggle = (id) => setOpenSection((prev) => (prev === id ? null : id));

  return (
    <main className="min-h-screen bg-[var(--background)] pt-20 md:pt-24 bg-agenko-grid overflow-hidden text-[var(--foreground)]">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D26FF]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 g-px pt-8 pb-14 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-[var(--background-alt)] border border-[var(--border)] rounded-full px-4 py-1.5 mb-5">
            <Shield className="w-4 h-4 text-[#9D26FF]" />
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-5">
            Your Privacy,{" "}
            <span className="text-[#9D26FF]">
              Our Responsibility
            </span>
          </h1>
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed mb-4">
            We are committed to protecting your personal data and being transparent about how we use it. This policy applies to all visitors to our website and all clients who engage Derixio for digital services.
          </p>
          <div className="inline-flex items-center gap-2 text-[var(--foreground-muted)] text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            Last updated: {LAST_UPDATED}
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="relative z-10 g-px pb-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { icon: Lock, title: "No Data Selling", desc: "We never sell your personal information to third parties — ever." },
            { icon: Shield, title: "SSL Encrypted", desc: "All data transmitted to and from our website is encrypted with TLS." },
            { icon: UserCheck, title: "Your Rights Respected", desc: "Access, correct, or delete your data at any time by contacting us." },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-md"
            >
              <badge.icon className="w-7 h-7 text-[#9D26FF] mb-3" />
              <h3 className="text-[var(--foreground-heading)] font-bold text-sm mb-1">{badge.title}</h3>
              <p className="text-[var(--foreground-muted)] text-xs leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Accordion Sections */}
      <section className="relative z-10 g-px pb-20 max-w-4xl mx-auto space-y-3">
        {sections.map((section) => (
          <AccordionSection
            key={section.id}
            section={section}
            isOpen={openSection === section.id}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-16 border-t border-[var(--border)] bg-[var(--card)]">
        <div className="g-px text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--foreground-heading)] mb-3">Have a Privacy Question?</h2>
          <p className="text-[var(--foreground-muted)] text-sm mb-6">
            Our team is happy to clarify anything about how we handle your data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl text-sm hover:scale-105 transition-transform shadow-md"
            >
              Contact Us
            </Link>
            <Link
              href="/terms-of-service"
              className="px-6 py-3 border border-[var(--border)] bg-[var(--background-alt)] text-[var(--foreground-heading)] hover:border-[#9D26FF] font-semibold rounded-xl text-sm transition-all"
            >
              View Terms of Service →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
