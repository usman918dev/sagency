/**
 * /privacy-policy — server component
 */
import PrivacyContent from "./_PrivacyContent";

export const metadata = {
  title: "Privacy Policy | Derixio Digital Agency",
  description:
    "Read Derixio's Privacy Policy. Learn how we collect, use, and protect your personal data when you work with our digital agency or visit our website.",
  alternates: { canonical: "https://www.derixio.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Derixio Digital Agency",
    description: "How Derixio collects, uses, and protects your personal data.",
    url: "https://www.derixio.com/privacy-policy",
    siteName: "Derixio",
    locale: "en_US",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
