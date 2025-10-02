import { servicesData, getServiceBySlug } from '@/lib/servicesData';
import Hero from '@/components/services/Hero';
import ServiceDescription from '@/components/services/ServiceDescription';
import FeaturesList from '@/components/services/FeaturesList';
import PricingPlans from '@/components/services/PricingPlans';
import CTA from '@/components/services/CTA';

export async function generateStaticParams() {
  return servicesData.map(service => ({
    slug: service.slug,
  }));
}

// export async function generateMetadata({ params }) {
//     const service = await getServiceBySlug(params.slug);
//     if (!service) {
//         return {
//             title: "Service Not Found",
//             description: "The service you are looking for does not exist.",
//         };
//     }

//     const description = service.description.replace(/<[^>]*>?/gm, '').substring(0, 160);
//     const jsonLd = {
//         "@context": "https://schema.org",
//         "@type": "Service",
//         "name": service.title,
//         "description": description,
//         "image": service.coverImage,
//         "provider": {
//           "@type": "Organization",
//           "name": "Sagency"
//         },
//         "offers": service.pricingPlans.map(plan => ({
//           "@type": "Offer",
//           "name": plan.planName,
//           "price": plan.price,
//           "priceCurrency": "USD" 
//         }))
//       };

//     return {
//         title: `${service.title} | Services | Sagency`,
//         description: description,
//         openGraph: {
//             title: `${service.title} | Services | Sagency`,
//             description: description,
//             images: [
//                 {
//                     url: service.coverImage,
//                     width: 1200,
//                     height: 630,
//                     alt: service.title,
//                 },
//             ],
//         },
//         other: {
//             "script[type='application/ld+json']": JSON.stringify(jsonLd)
//         }
//     };
// }


const ServicePage = ({ params }) => {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <main className="bg-[#1c2131]">
      <Hero 
        title={service.title} 
        coverImage={service.coverImage}
        icon={service.icon}
      />
      <ServiceDescription description={service.description} />
      <FeaturesList features={service.features} />
      <PricingPlans plans={service.pricingPlans} />
      <CTA />
    </main>
  );
};

export default ServicePage;
