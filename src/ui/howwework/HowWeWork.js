"use client";
import React, { useState } from "react";
import { 
  Search, 
  Target, 
  Palette, 
  Rocket, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Research & Discovery",
    description: "We dive deep into your business, audience, and market to understand your unique challenges and opportunities.",
    icon: Search,
    duration: "1-2 weeks",
    deliverables: ["Market Analysis", "User Research", "Competitive Audit", "Brand Guidelines"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: 2,
    number: "02", 
    title: "Strategy & Planning",
    description: "Based on research insights, we craft a comprehensive strategy tailored to your goals and target audience.",
    icon: Target,
    duration: "1 week",
    deliverables: ["Strategic Roadmap", "Content Strategy", "Technical Specs", "Timeline & Milestones"],
    color: "from-orange-600 to-orange-500"
  },
  {
    id: 3,
    number: "03",
    title: "Design & Development", 
    description: "Our creative team brings the strategy to life with stunning designs and robust development solutions.",
    icon: Palette,
    duration: "2-4 weeks",
    deliverables: ["UI/UX Design", "Brand Assets", "Website/App Development", "Quality Assurance"],
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: 4,
    number: "04",
    title: "Launch & Deployment",
    description: "We ensure a smooth launch with comprehensive testing, deployment, and immediate post-launch support.",
    icon: Rocket,
    duration: "3-5 days",
    deliverables: ["Final Testing", "Go-Live Support", "Performance Monitoring", "Team Training"],
    color: "from-yellow-500 to-orange-400"
  },
  {
    id: 5,
    number: "05",
    title: "Growth & Optimization",
    description: "Post-launch, we continuously monitor, analyze, and optimize to ensure sustained growth and success.",
    icon: TrendingUp,
    duration: "Ongoing",
    deliverables: ["Performance Reports", "A/B Testing", "Continuous Updates", "Strategic Consulting"],
    color: "from-orange-400 to-red-400"
  }
];

const ProcessCard = ({ step, index, isActive, onHover }) => {
  const IconComponent = step.icon;
  
  return (
    <div
      className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-500 hover:border-orange-500/50 hover:bg-gray-900/80 hover:scale-105 cursor-pointer ${
        isActive ? 'border-orange-500/50 bg-gray-900/80 scale-105' : ''
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
          {step.number}
        </div>
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} p-[2px] group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
            <IconComponent className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
          {step.title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {step.description}
        </p>

        <div className="flex items-center gap-2 text-orange-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{step.duration}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Deliverables:</h4>
          <div className="space-y-1">
            {step.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {index < processSteps.length - 1 && (
        <div className="hidden xl:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
          <div className={`w-16 h-[2px] bg-gradient-to-r ${step.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`}>
            <ArrowRight className="w-5 h-5 text-orange-400 absolute -right-2 -top-2" />
          </div>
        </div>
      )}

      {index < processSteps.length - 1 && (
        <div className="xl:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`w-[2px] h-16 bg-gradient-to-b ${step.color} opacity-30`}>
            <div className="w-3 h-3 bg-orange-400 rounded-full absolute -bottom-1 -left-[5px]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="relative w-full py-24 px-6 bg-[#0D1117] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-2 mb-8">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">Our Process</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            How We{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our proven 5-step process ensures every project delivers exceptional results. 
            From initial research to ongoing growth, we're with you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 xl:gap-4 mb-20">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              onHover={setActiveStep}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
          {[
            { label: "Projects Completed", value: "500+" },
            { label: "Happy Clients", value: "200+" },
            { label: "Countries Served", value: "25+" },
            { label: "Team Experts", value: "50+" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and create a custom strategy that drives real results for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-gray-700 text-gray-300 font-semibold rounded-full hover:border-orange-500 hover:text-white transition-all duration-300 hover:bg-orange-500/10"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;