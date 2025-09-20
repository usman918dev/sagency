import {
  GraduationCap,
  Handshake,
  BadgePercent,
  Sparkles,
  Telescope,
  ArrowRight,
} from 'lucide-react';
import React from 'react';

// Reusable Card Component for features
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = '',
  highlighted = false,
}) => {
  // Dynamic styles for dark theme
  const cardStyles = highlighted
    ? 'bg-orange-500 text-white'
    : 'bg-[#0d1117] text-white border border-[#30363d]';

  const textStyles = highlighted ? 'text-orange-100' : 'text-gray-400';
  const iconStyles = highlighted ? 'text-white bg-[#89898947]' : 'text-orange-500 bg-[#1a1f25]';
  const linkStyles = highlighted
    ? 'text-white hover:text-orange-100'
    : 'text-gray-300 hover:text-white';

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl p-6 transition-colors duration-300 ${cardStyles} ${className}`}
    >
      <div>
        {/* Icon */}
        <div className={`mb-6 flex items-center justify-center w-16 h-16 rounded-full ${iconStyles}`}>
          <Icon size={32} className={iconStyles} />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold">{title}</h3>

        {/* Description */}
        {description && (
          <p className={`text-sm ${textStyles}`}>{description}</p>
        )}
      </div>

      {/* Learn More Link */}
      {/* <a
                href="#"
                className={`mt-6 flex items-center gap-2 self-start text-sm font-semibold transition-colors ${linkStyles}`}
            >
                Learn more
                <ArrowRight size={16} />
            </a> */}
    </div>
  );
};

// Main Component
const WhyChooseUs = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Innovative Solutions',
      description: 'We leverage cutting-edge technologies and creative strategies to deliver outstanding digital experiences.',
      className: 'lg:col-span-4',
    },
    {
      icon: Handshake,
      title: 'Dedicated Support',
      description: 'Our team provides 24/7 support and maintains clear communication throughout your project.',
      className: 'lg:col-span-4',
    },
    {
      icon: BadgePercent,
      title: 'Results-Driven Approach',
      description: 'We focus on delivering measurable results that directly impact your business growth and ROI.',
      className: 'md:col-span-2 lg:col-span-8 ',
      highlighted: true,
    },
    {
      icon: GraduationCap,
      title: 'Expert Team',
      description: 'Our professionals bring years of industry experience and expertise to every project we undertake.',
      className: 'lg:col-span-4',
    },
    {
      icon: Telescope,
      title: 'Future-Ready Solutions',
      description: 'We stay ahead of industry trends to ensure your digital presence remains competitive and innovative.',
      className: 'lg:col-span-4',
    },
  ];

  return (
    <div className="flex min-h-screen w-full ">
      <main className="w-full ">
        <section className="rounded-3xl  p-6 sm:p-10 lg:p-16 border border-[#30363d]  container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">

            {/* Main Title */}
            <div className="md:col-span-2 lg:col-span-4 lg:row-span-1">
              <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
                Why Choose
                <br />
                Us?
              </h2>
            </div>

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}

            {/* Launch Career Block */}
            <div className="flex h-full flex-col justify-between rounded-2xl p-6 md:col-span-2 lg:col-span-7">
              <div>

                <p className="text-gray-400">
                  Let's collaborate to create innovative digital solutions that will help your business thrive in the modern digital landscape.
                  Our expert team is ready to bring your vision to life.
                </p>
                <p className="text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl">
                  READY TO TRANSFORM YOUR DIGITAL PRESENCE?
                </p>
              </div>

            </div>
<div className="col-span-1 flex items-end justify-end mt-8">
  <button
    aria-label="Launch your sales career"
    className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white transition-transform hover:scale-105"
  >
    <ArrowRight size={24} />
  </button>
</div>

          </div>

        </section>
      </main>
    </div>
  );

};

export default WhyChooseUs;