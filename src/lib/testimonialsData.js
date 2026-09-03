/**
 * Single source of truth for all testimonial data.
 * Both the Testimonials UI component and the homepage JSON-LD schema
 * import from here — so editing this array automatically updates both
 * the visible page content and the structured data.
 */
export const testimonialsData = [
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "StartupVenture Inc.",
    image: "/assets/testimonial2.jpg",
    rating: 5,
    text: "The web engineering team at Derixio delivered beyond our expectations. Our new platform not only looks stunning but also performs exceptionally well. We've seen a 200% increase in conversions.",
    project: "E-commerce Platform Engineering",
    date: "February 2024",
    results: [
      "200% increase in conversions",
      "50% faster loading times",
      "Mobile-first experience"
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Brand Manager",
    company: "Creative Studios",
    image: "/assets/testimonial3.jpg",
    rating: 5,
    text: "Derixio's design team created a brand identity that perfectly captures our vision. The logo, website, and marketing assets work together seamlessly. Our market presence has elevated significantly.",
    project: "Complete Brand Identity",
    date: "January 2024",
    results: [
      "Complete brand overhaul",
      "Increased recognition by 150%",
      "Consistent brand messaging"
    ]
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Operations Manager",
    company: "Manufacturing Pro",
    image: "/assets/testimonial4.jpg",
    rating: 5,
    text: "The mobile app development was flawless. Derixio delivered on time and within budget. The app has streamlined our operations and improved client satisfaction dramatically.",
    project: "Custom Application Engineering",
    date: "December 2023",
    results: [
      "On-time delivery",
      "Within budget",
      "95% user satisfaction rating"
    ]
  },
  {
    id: 5,
    name: "Lisa Park",
    position: "Digital Marketing Lead",
    company: "Growth Dynamics",
    image: "/assets/testimonial5.jpg",
    rating: 5,
    text: "Derixio's SEO strategy is outstanding. We went from page 3 to page 1 on Google for our main search keywords. Organic traffic tripled and conversion rates set new records.",
    project: "SEO",
    date: "November 2023",
    results: [
      "First page Google rankings",
      "300% increase in organic traffic",
      "Higher quality sales leads"
    ]
  }
];
