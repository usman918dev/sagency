import "./globals.css";
import Navbar from "@/ui/navbar/Navbar";
import Footer from "@/ui/footer/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Root-level metadata.
 * Individual pages override title + description via their own metadata export
 * or generateMetadata(). The template ensures consistent branding.
 */
export const metadata = {
  title: {
    default: "We Grow Amazon Brands. And Everything Around Them. | Derixio",
    template: "%s | Derixio",
  },
  description:
    "Derixio is a creative growth agency helping brands grow through strategic branding, Amazon creative solutions, store optimization, web experiences, and performance-driven marketing.",
  keywords: [
    "Derixio",
    "We Grow Amazon Brands",
    "Amazon Growth Agency",
    "Amazon Store Optimization",
    "Amazon Listing Design",
    "Amazon A+ Content",
    "Amazon PPC Management",
    "Creative Growth Agency",
    "Strategic Branding",
    "Web Development",
    "Performance Marketing",
    "Digital Agency",
  ],
  authors: [{ name: "Derixio Team" }],
  creator: "Derixio",
  // www-canonical as metadataBase — all relative OG/twitter image paths resolve correctly
  metadataBase: new URL("https://www.derixio.com"),
  alternates: {
    canonical: "https://www.derixio.com",
  },
  icons: {
    icon: "/assets/derixio-icon.jpg",
    shortcut: "/assets/derixio-icon.jpg",
    apple: "/assets/derixio-icon.jpg",
  },
  openGraph: {
    title: "Derixio | Everything Your Brand Needs to Grow",
    description:
      "Derixio is a creative growth agency helping brands grow through strategic branding, Amazon creative solutions, web experiences, and performance-driven marketing.",
    url: "https://www.derixio.com",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio | Everything Your Brand Needs to Grow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derixio | Everything Your Brand Needs to Grow",
    description:
      "Derixio is a creative growth agency helping brands grow through strategic branding, Amazon creative solutions, web experiences, and performance-driven marketing.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: [
      "YtbTs-iFymagwGz8iVy8s83q5FoOgnbyk4ao029WExY",
      "VgkoHdxNs9FXZTt-4HwSgFOaEDjGO2LxA-x2vQF7Cdc"
    ],
  },
};

/**
 * GLOBAL CANONICAL SCHEMA — injected once in the root <head> for ALL pages.
 *
 * Contains the FULL Organization + WebSite definitions with stable @id values.
 * Every other page's schema references these via @id only (no re-declaration),
 * which is the entity-consistency pattern Google's documentation recommends.
 *
 *   Organization @id → https://www.derixio.com/#organization
 *   WebSite      @id → https://www.derixio.com/#website
 */
const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.derixio.com/#organization",
      "name": "Derixio",
      "additionalType": "https://schema.org/ProfessionalService",
      "url": "https://www.derixio.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.derixio.com/#logo",
        "url": "https://www.derixio.com/assets/derixio-official-logo.png",
        "contentUrl": "https://www.derixio.com/assets/derixio-official-logo.png",
        "width": 512,
        "height": 512,
        "caption": "Derixio | Everything Your Brand Needs to Grow"
      },
      "image": { "@id": "https://www.derixio.com/#logo" },
      "description":
        "Derixio is a Creative Growth Agency specializing in Amazon Listing Design, Premium A+ Content, Brand Identity, Packaging Design, Graphic Design, Web Development, SEO, Digital Marketing, and Amazon PPC.",
      "telephone": "+92-302-4165348",
      "email": "hello@derixio.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lahore",
        "addressCountry": "PK"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+92-302-4165348",
          "email": "hello@derixio.com",
          "contactType": "customer service",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"]
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/derixio/",
        "https://www.behance.net/derixiosolutio",
        "https://web.facebook.com/derixio",
        "https://www.instagram.com/derixio_official/",
        "https://www.reddit.com/user/derixio/"
      ],
      "founder": [
        {
          "@type": "Person",
          "@id": "https://www.derixio.com/team/muhammad-usman#person",
          "name": "Muhammad Usman",
          "alternateName": "Usman Lurka",
          "jobTitle": "Founder & CEO",
          "url": "https://www.derixio.com/team/muhammad-usman",
          "image": {
            "@type": "ImageObject",
            "@id": "https://www.derixio.com/team/muhammad-usman#person-image",
            "url": "https://www.derixio.com/assets/muhammadusman.jpg",
            "contentUrl": "https://www.derixio.com/assets/muhammadusman.jpg",
            "caption": "Muhammad Usman - Founder & CEO of Derixio"
          },
          "description": "Muhammad Usman is the Founder & CEO of Derixio, specializing in Amazon Listing Design, Premium A+ Content, Branding, Packaging Design, Web Development, SEO, Digital Marketing, and Amazon PPC.",
          "worksFor": { "@id": "https://www.derixio.com/#organization" },
          "sameAs": [
            "https://www.linkedin.com/in/muhammadusmanlurka/",
            "https://www.behance.net/muhammadusman2521",
            "https://www.fiverr.com/phullu_designer?public_mode=true"
          ]
        },
        {
          "@type": "Person",
          "@id": "https://www.derixio.com/team/muhammad-sajjad#person",
          "name": "Muhammad Sajjad",
          "alternateName": "Sajjad Aulakh",
          "jobTitle": "Co-Founder & Creative Director",
          "url": "https://www.derixio.com/team/muhammad-sajjad",
          "image": {
            "@type": "ImageObject",
            "@id": "https://www.derixio.com/team/muhammad-sajjad#person-image",
            "url": "https://www.derixio.com/assets/sajjad.jpg",
            "contentUrl": "https://www.derixio.com/assets/sajjad.jpg",
            "caption": "Muhammad Sajjad - Co-Founder & Creative Director of Derixio"
          },
          "description": "Muhammad Sajjad is the Co-Founder & Creative Director of Derixio, specializing in Amazon Graphic Design, Premium A+ Content, Brand Identity, Packaging Design, and Creative Direction.",
          "worksFor": { "@id": "https://www.derixio.com/#organization" },
          "sameAs": [
            "https://www.linkedin.com/in/sajjadahmadaulakh/",
            "https://www.behance.net/sajjadaulakh",
            "https://www.fiverr.com/users/sajjad_aulakh/"
          ]
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Derixio Creative Growth Agency Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Amazon Listing Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Amazon A+ Content" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Identity" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Packaging Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Amazon PPC" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.derixio.com/#website",
      "url": "https://www.derixio.com",
      "name": "Derixio",
      "description": "Derixio | Creative Growth Agency",
      "publisher": { "@id": "https://www.derixio.com/#organization" },
      "inLanguage": "en-US"
    }
  ]
};

import { ThemeProvider } from "@/context/ThemeContext";

const noFlashScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script
          id="no-flash-script"
          dangerouslySetInnerHTML={{ __html: noFlashScript }}
        />
        {/* Global canonical entity schema — injected once, referenced by @id on all pages */}
        <script
          id="global-schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[#9D26FF] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
