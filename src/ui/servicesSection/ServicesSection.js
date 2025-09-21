import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ServiceSection({ service, inverted, prefersReducedMotion }) {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-gray-100">
      <div className="min-h-[50vh] max-h-[600px] flex items-center">
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