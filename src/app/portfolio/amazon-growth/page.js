import AmazonGrowthPortfolioView from '@/ui/portfolio/AmazonGrowthPortfolioView';
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  BASE_URL,
} from '@/lib/schemaHelpers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Amazon Growth Portfolio – Listing Images, A+ Content & PPC Results | Derixio',
  description: 'Explore Amazon Growth case studies, high-converting Amazon listing image designs, A+ Content layouts, Amazon Storefront designs, and PPC campaign results by Derixio.',
  alternates: {
    canonical: 'https://www.derixio.com/portfolio/amazon-growth',
  },
  openGraph: {
    title: 'Amazon Growth Portfolio | Derixio Creative Growth Agency',
    description: 'Browse Amazon listing images, A+ Content layouts, Storefront designs, and PPC growth case studies by Derixio.',
    url: 'https://www.derixio.com/portfolio/amazon-growth',
    siteName: 'Derixio',
    images: [
      {
        url: 'https://www.derixio.com/assets/hero-amazon.png',
        width: 1200,
        height: 630,
        alt: 'Amazon Growth Portfolio – Derixio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Growth Portfolio – Derixio Agency',
    description: 'Explore high-converting Amazon listing graphics, A+ Content designs, and PPC campaign results.',
    images: ['https://www.derixio.com/assets/hero-amazon.png'],
  },
};

export default function AmazonGrowthPortfolioPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Amazon Growth', url: '/portfolio/amazon-growth' },
  ]);

  const webPage = buildWebPage({
    url: '/portfolio/amazon-growth',
    name: 'Amazon Growth Portfolio | Derixio',
    description: 'Browse Amazon listing images, A+ Content layouts, Storefront designs, and PPC growth case studies by Derixio.',
    type: 'CollectionPage',
  });

  const jsonLd = buildJsonLd([webPage, breadcrumb]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmazonGrowthPortfolioView />
    </>
  );
}
