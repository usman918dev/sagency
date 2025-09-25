"use client";

import React from "react";
import { Search, Megaphone, Palette, Globe, ShoppingBag, Clapperboard } from "lucide-react";
import Button from "../btn/Button";

const cards = [
    { title: 'SEO', description: 'Our SEO experts optimize your website, ensuring it ranks higher in search results and attracts targeted organic traffic.', icon: Search, img: '/assets/seo1.webp' },
    { title: 'Digital Marketing', description: 'Unleash the power of data-driven strategies in digital marketing to drive unprecedented success and establish a dominant presence.', icon: Megaphone, img: '/assets/digi.jpg' },
    { title: 'Graphic Design', description: 'Elevate your brand with captivating Graphic Design that creates lasting impressions and sets you apart as a leader in your industry.', icon: Palette, img: '/assets/d1.jpg' },
    { title: 'Website Development', description: 'We create stunning, user-friendly websites that showcase your brand and deliver a seamless browsing experience.', icon: Globe, lottie: 'yes' },
    { title: 'eCommerce Developments', description: 'Transform your business into an engaging mobile experience that drives user loyalty.', icon: ShoppingBag, img: '/assets/ecom1.webp' },
    { title: 'Video Editing', description: 'Creative edits, smooth transitions, and cinematic visuals for every project.', icon: Clapperboard, img: '/assets/edit.jpg' },
];

const CardGridTailwind = () => {
    return (
        <div
            className="grid gap-12 p-6 max-w-7xl mx-auto
                 sm:grid-cols-1 
                 md:grid-cols-2
                 lg:grid-cols-3"
        >
            {cards.map((card, idx) => {
                const Icon = card.icon;

                return (
                    <div
                        key={idx}
                        className="relative border border-white/10 shadow-2xl bg-gradient-to-r from-[#1b2439] via-[#16213e] to-[#1b2439] hover:shadow-orange-500/50 rounded-sm py-6 px-10 flex flex-col items-center text-center overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-3 w-64 w-full"
                    >
                        {/* Rising accent background from bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-[#F25725] to-[#FF7E5F] transition-all duration-500 ease-in-out group-hover:h-full -z-10 rounded-cm"></div>

                        {/* Icon */}
                        {Icon && (
                            <div className="bg-gradient-to-r from-[#F25725] shadow-2xl hover:shadow-gray-400 to-[#ff6b35] text-white w-12 h-12 flex items-center justify-center rounded-full mb-4 z-10 shadow-md">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        )}

                        {/* Text */}
                        <h3 className="font-semibold text-2xl mb-4 z-10 text-white">
                            {card.title}
                        </h3>
                        <p className="text-gray-100 text-md z-10 hover:text-white mb-4">
                            {card.description}
                        </p>

                        {/* CTA Button */}
                        {/* <button
                            className="relative z-10 mt-auto px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#F25725] to-[#ff6b35] rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Learn More
                        </button> */}
                        <Button text={"Learn More"}/>
                        {/* Bottom line */}
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F25725] to-[#ff6b35] rounded-tr-xl rounded-tl-xl z-10"></span>
                    </div>
                );

            })}
        </div>
    );
};

export default CardGridTailwind