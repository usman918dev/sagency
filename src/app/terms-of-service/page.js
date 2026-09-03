/**
 * /terms-of-service — server component
 */
import TermsContent from "./_TermsContent";

export const metadata = {
  title: "Terms of Service | Derixio Digital Agency",
  description:
    "Read Derixio's Terms of Service including our 85% money-back guarantee, unlimited revision policy, weekly update commitment, and client protection guarantees.",
  alternates: { canonical: "https://www.derixio.com/terms-of-service" },
  openGraph: {
    title: "Terms of Service | Derixio Digital Agency",
    description:
      "Derixio Terms of Service: 85% money-back guarantee, unlimited revisions, weekly project updates, and client protection guarantees.",
    url: "https://www.derixio.com/terms-of-service",
    siteName: "Derixio",
    locale: "en_US",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return <TermsContent />;
}
