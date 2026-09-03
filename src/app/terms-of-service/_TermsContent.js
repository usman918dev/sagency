"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  RefreshCw,
  BellRing,
  DollarSign,
  PenLine,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Handshake,
  Scale,
  Award,
  RotateCcw,
  Ban,
  Mail,
} from "lucide-react";

const LAST_UPDATED = "August 2025";

const guaranteeBadges = [
  {
    icon: DollarSign,
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
    title: "85% Money-Back Guarantee",
    desc: "If you cancel your plan or project contract at any point, we guarantee an 85% refund of unused service fees — no lengthy disputes, no hidden deductions.",
  },
  {
    icon: RefreshCw,
    color: "from-[#9D26FF]/20 to-[#7C3AED]/10 border-purple-500/30",
    iconColor: "text-[#C084FC]",
    title: "Unlimited Revision Policy",
    desc: "Not satisfied with the deliverable? We will revise it as many times as needed until you are completely happy and formally approve it. Your approval is the finish line.",
  },
  {
    icon: BellRing,
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400",
    title: "Weekly Progress Updates",
    desc: "Every active project receives a structured weekly status report detailing what was completed, what is next, and any blockers requiring your input.",
  },
];

const sections = [
  {
    id: "acceptance",
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client") and Derixio ("Agency", "we", "us", "our"), a digital agency based in Lahore, Pakistan.\n\nBy signing a project contract, submitting a project brief, making a payment, or otherwise engaging Derixio's services, you confirm that you have read, understood, and agreed to these Terms in full.\n\nIf you are entering into this agreement on behalf of a company or organisation, you represent that you have the authority to bind that entity to these Terms.`,
  },
  {
    id: "services",
    icon: Award,
    title: "2. Scope of Services",
    content: `Derixio provides the following digital services:\n\n• Amazon Growth (listing optimization, A+ content, storefront design, PPC advertising)\n• Custom Web Development (Next.js, React, full-stack applications)\n• Graphic & Brand Design (logos, brand identity, social creatives, packaging)\n• Digital Marketing (social media ads, Google Ads, funnel strategy)\n• Search Engine Optimisation (technical SEO, content strategy, link building)\n• Video & Motion Design (editing, motion graphics, commercial ad creatives)\n\nThe specific services, deliverables, timelines, and pricing for each engagement are defined in the individual project contract or proposal signed between Derixio and the Client. These Terms supplement and operate alongside that project-specific agreement.`,
  },
  {
    id: "weekly-updates",
    icon: BellRing,
    title: "3. Weekly Project Update Commitment",
    content: `Derixio is committed to full transparency throughout every project. For all active engagements:\n\n3.1  WEEKLY STATUS REPORTS — Every Client will receive a formal project status update every 7 calendar days. Reports will include:\n   • Tasks completed during the week\n   • Tasks planned for the following week\n   • Any blockers or decisions requiring Client input\n   • Current progress against the agreed project timeline\n\n3.2  COMMUNICATION CHANNELS — Updates will be delivered via email and/or the agreed project management channel (WhatsApp, Slack, Notion, etc.) as established at project kickoff.\n\n3.3  MILESTONE SIGN-OFF — Major project milestones (wireframes, design mockups, development builds, final deliverables) require written Client approval before the project advances to the next phase.\n\n3.4  RESPONSIVE COMMUNICATION — Derixio will respond to all Client messages within 1 business day during standard business hours (Monday – Friday, 9:00 AM – 6:00 PM PKT).`,
  },
  {
    id: "revisions",
    icon: RefreshCw,
    title: "4. Revision & Quality Guarantee",
    content: `4.1  UNLIMITED REVISIONS UNTIL APPROVAL — Derixio guarantees that we will revise any deliverable until the Client is fully satisfied and formally approves it. There is no cap on the number of revision rounds during the active project scope.\n\n4.2  WHAT CONSTITUTES A REVISION — A revision is a modification of an existing deliverable within the originally agreed scope. Revisions include:\n   • Design adjustments (colours, typography, layout, imagery)\n   • Copy and content edits\n   • Functionality changes within the agreed scope\n   • Performance fixes\n\n4.3  SCOPE CHANGES VS. REVISIONS — Requests that materially change the project scope (new pages, new features, entirely new design direction) are not revisions — these are scope additions. Scope additions are quoted and agreed separately.\n\n4.4  APPROVAL PROCESS — Formal approval must be provided in writing (email or messaging platform). Verbal approval does not advance a deliverable to "approved" status.\n\n4.5  DEEMED APPROVAL — If a Client does not respond to a revision request or approval prompt within 14 business days despite follow-up from Derixio, the last submitted deliverable will be deemed approved and the project will progress accordingly.`,
  },
  {
    id: "refund",
    icon: DollarSign,
    title: "5. Cancellation & 85% Money-Back Guarantee",
    content: `Derixio offers one of the strongest refund policies in the industry, reflecting our confidence in the quality of our work and our respect for your investment.\n\n5.1  85% REFUND ON CANCELLATION — If you choose to cancel a project or service plan at any time, Derixio will refund 85% of the fees paid for services not yet delivered or commenced.\n\n   Example: If you paid $1,000 for a service and $300 worth of work has been completed and delivered, the cancellable portion is $700. You receive 85% of that ($595 refund). The remaining 15% covers administrative, onboarding, and resource-allocation costs.\n\n5.2  HOW TO CANCEL — Submit your cancellation request in writing to hello@derixio.com with your project name and the reason for cancellation. We will acknowledge within 2 business days.\n\n5.3  REFUND PROCESSING — Approved refunds are processed within 7–14 business days via the original payment method.\n\n5.4  NON-REFUNDABLE PORTIONS — The following are non-refundable:\n   • Completed and Client-approved deliverables\n   • Third-party costs purchased on the Client's behalf (domain names, stock photography, software licences, ad spend)\n   • Rush or priority delivery fees after work has been delivered\n   • Administrative fees (15% of unused portion, as noted above)\n\n5.5  MONTHLY RETAINER CANCELLATION — For ongoing monthly retainer services (SEO, Digital Marketing, Amazon Growth), cancellation requires 30 days' written notice. Work completed within that notice period is charged at the contracted monthly rate.`,
  },
  {
    id: "payments",
    icon: PenLine,
    title: "6. Payment Terms",
    content: `6.1  PAYMENT SCHEDULE — Payment terms are defined in each project contract. Standard terms are:\n   • Fixed-price projects: 50% deposit before work commences; 50% on final delivery and approval.\n   • Monthly retainers: Invoiced at the start of each billing cycle, due within 7 days.\n\n6.2  LATE PAYMENTS — Invoices unpaid after 14 days of the due date incur a 1.5% monthly late fee on the outstanding balance. Derixio reserves the right to pause active project work if a payment remains outstanding for more than 21 days.\n\n6.3  CURRENCY — All prices are quoted and invoiced in USD unless otherwise agreed in writing.\n\n6.4  TAXES — Clients are responsible for any applicable taxes, withholding taxes, or import duties in their jurisdiction. Derixio will provide proper invoicing to support any tax compliance requirements.`,
  },
  {
    id: "ip",
    icon: ShieldCheck,
    title: "7. Intellectual Property",
    content: `7.1  CLIENT OWNERSHIP ON FULL PAYMENT — Upon receipt of all agreed payments, the Client receives full ownership of all final approved deliverables, including source files, code repositories, and design assets.\n\n7.2  DERIXIO RETAINS RIGHTS UNTIL PAYMENT — Until full payment is received, all deliverables remain the intellectual property of Derixio. Clients may not publish, use, or distribute deliverables commercially before payment is settled.\n\n7.3  PORTFOLIO USE — Derixio reserves the right to showcase completed work in our portfolio, case studies, and marketing materials unless the Client requests in writing that specific work be kept confidential at the time of contract signing.\n\n7.4  THIRD-PARTY ASSETS — Any third-party assets (fonts, stock images, plugins, libraries) incorporated into a project are subject to their own licences. Derixio will advise on required licences; the Client is responsible for maintaining any ongoing licences post-delivery.`,
  },
  {
    id: "confidentiality",
    icon: Scale,
    title: "8. Confidentiality",
    content: `Both parties agree to keep confidential any proprietary business information, strategies, technical specifications, or financial details shared during the engagement.\n\nDerixio will not disclose your project details, business data, or strategy to any third party without your written consent, except where required by law or necessary to deliver the agreed services (e.g., sharing brief with an assigned team member).`,
  },
  {
    id: "liability",
    icon: AlertCircle,
    title: "9. Limitation of Liability",
    content: `9.1  Derixio's total liability for any claim arising from a project shall not exceed the total fees paid by the Client for that specific project.\n\n9.2  Derixio is not liable for:\n   • Loss of revenue, profit, or business opportunities resulting from delays or defects.\n   • Third-party service outages (hosting, ad platforms, payment processors).\n   • Client-supplied content that is inaccurate, infringing, or illegal.\n   • Results from digital marketing campaigns, SEO rankings, or advertising performance (we commit to best efforts and industry-standard practices, not guaranteed outcomes).\n\n9.3  FORCE MAJEURE — Neither party is liable for delays or failures caused by circumstances beyond reasonable control, including natural disasters, internet infrastructure failures, or government actions.`,
  },
  {
    id: "termination",
    icon: Ban,
    title: "10. Termination",
    content: `10.1  BY CLIENT — The Client may terminate a project at any time with written notice. The 85% money-back guarantee applies to unused fees as described in Section 5.\n\n10.2  BY DERIXIO — Derixio reserves the right to terminate an engagement with 14 days' written notice if:\n   • Payment remains outstanding after 30 days despite follow-up.\n   • The Client engages in abusive, discriminatory, or harassing behaviour toward Derixio team members.\n   • The project requires us to create content that is illegal, deceptive, or violates third-party rights.\n\nIn the event of termination by Derixio for cause, we will refund fees for work not yet started. Delivered and approved work is non-refundable.`,
  },
  {
    id: "disputes",
    icon: Handshake,
    title: "11. Dispute Resolution",
    content: `11.1  GOOD FAITH NEGOTIATION — In the event of a dispute, both parties agree to first attempt resolution through direct, good-faith negotiation within 30 days of the dispute arising.\n\n11.2  MEDIATION — If negotiation fails, the parties agree to attempt mediation by a mutually agreed mediator before pursuing legal action.\n\n11.3  GOVERNING LAW — These Terms are governed by the laws of Pakistan. Any legal proceedings shall be conducted in Lahore, Pakistan.\n\n11.4  CLIENT PROTECTIONS — Nothing in this clause limits a Client's statutory rights or consumer protection rights under applicable local law.`,
  },
  {
    id: "modifications",
    icon: Clock,
    title: "12. Modifications to Terms",
    content: `Derixio may update these Terms from time to time. When changes are made, we will update the "Last Updated" date. Active Clients will be notified of material changes via email at least 14 days before they take effect.\n\nContinued engagement with Derixio's services after the effective date of updated Terms constitutes acceptance of the revised Terms.`,
  },
  {
    id: "contact-terms",
    icon: Mail,
    title: "13. Contact",
    content: `For any questions about these Terms, or to exercise any rights or submit a cancellation request:\n\nDerixio\nEmail: hello@derixio.com\nPhone: +92 302 4165348\nLahore, Pakistan\nBusiness Hours: Monday – Friday, 9:00 AM – 6:00 PM (PKT)\n\nWe will respond to all contractual and legal inquiries within 3 business days.`,
  },
];

function AccordionSection({ section, isOpen, onToggle }) {
  const Icon = section.icon;
  return (
    <motion.div
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group hover:bg-[var(--card-hover)] transition-colors"
        aria-expanded={isOpen}
        id={`tos-section-${section.id}`}
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
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function TermsContent() {
  const [openSection, setOpenSection] = useState("acceptance");

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
            <Handshake className="w-4 h-4 text-[#9D26FF]" />
            <span className="text-[#9D26FF] text-xs font-bold uppercase tracking-widest">
              Terms of Service &amp; Client Guarantees
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground-heading)] tracking-tight leading-tight mb-5">
            Clear Terms.{" "}
            <span className="text-[#9D26FF]">
              Strong Guarantees.
            </span>
          </h1>
          <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-relaxed mb-4">
            At Derixio, we believe trust is built through clarity and accountability. Our Terms of Service are written in plain English so you know exactly what you are agreeing to — and exactly what we guarantee in return.
          </p>
          <div className="inline-flex items-center gap-2 text-[var(--foreground-muted)] text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            Last updated: {LAST_UPDATED}
          </div>
        </motion.div>
      </section>

      {/* Core Guarantees — Hero Cards */}
      <section className="relative z-10 g-px pb-16 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-heading)] mb-2">
            Our Client{" "}
            <span className="text-[#9D26FF]">
              Guarantee Pillars
            </span>
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm">
            These are not just policies — they are commitments we stand behind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {guaranteeBadges.map((badge, i) => (
            <motion.div
              key={i}
              className="relative p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl backdrop-blur-md overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#9D26FF]/10 to-transparent transition-opacity duration-500 pointer-events-none rounded-2xl" />
              <badge.icon className={`w-9 h-9 ${badge.iconColor || "text-[#9D26FF]"} mb-4`} />
              <h3 className="text-[var(--foreground-heading)] font-extrabold text-base mb-2">{badge.title}</h3>
              <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Refund Callout Banner */}
        <motion.div
          className="mt-6 p-5 bg-[var(--card)] border border-[#9D26FF]/40 rounded-2xl flex items-start gap-4 shadow-md"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RotateCcw className="w-6 h-6 text-[#9D26FF] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#9D26FF] font-bold text-sm mb-1">
              How the 85% refund works, in plain terms:
            </p>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
              You pay $1,000. We complete $300 of work. You decide to cancel. We refund you{" "}
              <strong className="text-[var(--foreground-heading)] font-bold">85% of the remaining $700 = $595</strong>. The 15%
              covers our onboarding, resource-allocation, and administrative costs. No lengthy disputes,
              no hidden clauses — just a fair refund processed within 7–14 business days.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Full Terms Accordion */}
      <section className="relative z-10 g-px pb-20 max-w-4xl mx-auto space-y-3">
        <motion.h2
          className="text-xl font-bold text-[var(--foreground-heading)] mb-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Scale className="w-5 h-5 text-[#9D26FF]" />
          Full Terms &amp; Conditions
        </motion.h2>
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
          <h2 className="text-2xl font-bold text-[var(--foreground-heading)] mb-3">
            Questions About Our Terms?
          </h2>
          <p className="text-[var(--foreground-muted)] text-sm mb-6">
            We are happy to clarify any aspect of this agreement before you commit to a project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#9D26FF] hover:bg-[#8500ED] text-white font-bold rounded-xl text-sm hover:scale-105 transition-transform shadow-md"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/privacy-policy"
              className="px-6 py-3 border border-[var(--border)] bg-[var(--background-alt)] text-[var(--foreground-heading)] hover:border-[#9D26FF] font-semibold rounded-xl text-sm transition-all"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
