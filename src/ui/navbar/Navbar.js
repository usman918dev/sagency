"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe, Palette, Smartphone, ShoppingCart, Search, Settings } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeLink, setActiveLink] = useState("Home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for background blur effect
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Web Development", href: "/services", icon: Globe },
        { name: "Graphic Design", href: "/services", icon: Palette },
        { name: "Mobile Apps", href: "/services", icon: Smartphone },
        { name: "E-commerce", href: "/services", icon: ShoppingCart },
        { name: "SEO", href: "/services", icon: Search },
        { name: "Digital Marketing", href: "/services", icon: Settings },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled 
          ? "backdrop-blur-xl shadow-xl border-b border-white/10" 
          : "backdrop-blur-sm"
      }`}
    >
      <div className="g-px flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <img
              src="/assets/logomain.png"
              alt="Agency Logo"
              className={`transition-all duration-500 ease-in-out object-contain group-hover:scale-105 ${
                scrolled ? "w-12 h-12" : "w-16 h-16"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F25725]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl"></div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group">
              {link.dropdown ? (
                <button
                  onClick={() => {
                    setActiveLink(link.name);
                    setServicesOpen(!servicesOpen);
                  }}
                  className={`relative flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
                    activeLink === link.name ? "text-[#F25725]" : "text-white"
                  } hover:text-[#F25725] group-hover:bg-white/5 rounded-lg`}
                >
                  {link.name}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-all duration-300 ${
                      servicesOpen ? "rotate-180 text-[#F25725]" : "rotate-0"
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#F25725] to-[#ff6b35] transition-all duration-300 w-0 group-hover:w-full"></span>
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative block px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
                    activeLink === link.name ? "text-[#F25725]" : "text-white"
                  } hover:text-[#F25725] group-hover:bg-white/5 rounded-lg`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#F25725] to-[#ff6b35] transition-all duration-300 w-0 group-hover:w-full"></span>
                </Link>
              )}

              {link.dropdown && (
                <div
                  className={`absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 ease-out ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="p-2">
                    {link.dropdown.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#F25725]/10 hover:to-[#ff6b35]/10 hover:text-[#F25725] transition-all duration-300 rounded-lg group/item"
                          onClick={() => setServicesOpen(false)}
                        >
                          <IconComponent size={18} className="mr-3 text-[#F25725] group-hover/item:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{item.name}</span>
                          <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                            <ChevronDown size={14} className="rotate-[-90deg] text-[#F25725]" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="h-1 bg-gradient-to-r from-[#F25725] via-[#ff6b35] to-[#F25725]"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="relative px-6 py-3 bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#F25725]/25 hover:-translate-y-0.5"
          >
            <span className="relative z-10 transition-colors duration-300">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#d6471e] to-[#e55a2b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 text-white focus:outline-none group"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 top-3" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ease-in-out top-3 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 top-3" : "top-5"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden backdrop-blur-xl border-t border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <div key={index} className="relative">
              {link.dropdown ? (
                <button
                  onClick={() => {
                    setActiveLink(link.name);
                    setServicesOpen(!servicesOpen);
                  }}
                  className={`flex justify-between items-center w-full px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg ${
                    activeLink === link.name ? "text-[#F25725] bg-white/10" : "text-white"
                  } hover:bg-white/10 hover:text-[#F25725]`}
                >
                  {link.name}
                  <ChevronDown
                    size={18}
                    className={`transition-all duration-300 ${
                      servicesOpen ? "rotate-180 text-[#F25725]" : "rotate-0"
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg ${
                    activeLink === link.name ? "text-[#F25725] bg-white/10" : "text-white"
                  } hover:bg-white/10 hover:text-[#F25725]`}
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown && servicesOpen && (
                <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#F25725]/30 pl-4">
                  {link.dropdown.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setServicesOpen(false);
                        }}
                        className="flex items-center py-2 text-white/80 text-base hover:text-[#F25725] transition-all duration-300 hover:translate-x-2"
                      >
                        <IconComponent size={16} className="mr-3 text-[#F25725]" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-white/20">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full px-6 py-2 text-center bg-gradient-to-r from-[#F25725] to-[#ff6b35] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#F25725]/25 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
