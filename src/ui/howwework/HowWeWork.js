import React from "react";
import {
    MapPin,
    Layout,
    Code,
    Rocket,
} from "lucide-react"; // You can choose other icons

const steps = [
    {
        id: 1,
        title: "Discovery & Strategy",
        description:
            "We start by diving deep into your vision, goals, and market landscape to build a rock-solid strategic foundation for your project.",
        icon: <MapPin className="w-8 h-8 text-white" />,
    },
    {
        id: 2,
        title: "Design & Planning",
        description:
            "We craft intuitive user experiences and stunning visual designs. Detailed wireframes and prototypes give you a clear picture of the final product.",
        icon: <Layout className="w-8 h-8 text-white" />,
    },
    {
        id: 3,
        title: "Development & Execution",
        description:
            "Our expert developers bring designs to life with clean, efficient code. We follow agile methods, keeping you in the loop with regular updates.",
        icon: <Code className="w-8 h-8 text-white" />,
    },
    {
        id: 4,
        title: "Launch & Growth",
        description:
            "After rigorous testing, we deploy your project. Our partnership continues with ongoing support and strategic advice to help you grow.",
        icon: <Rocket className="w-8 h-8 text-white" />,
    },
];

const ProcessSection = () => {
    return (
        <section className="w-full py-20 px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Proven Process</span>
                </h2>
                <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
                    We turn complex ideas into digital realities through a clear, collaborative, and strategic workflow designed for success.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className=" backdrop-blur-md p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-3"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mb-6 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{`0${step.id}. ${step.title}`}</h3>
                            <p className="text-gray-500 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg transition-transform duration-300 hover:-translate-y-2"
                    >
                        Start Your Project Today
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
