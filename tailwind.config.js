// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeMove: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.7" },
          "50%": { transform: "translateY(-60px)", opacity: "1" },
        },
        fadeMoveReverse: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.7" },
          "50%": { transform: "translateY(60px)", opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(40px, -30px) scale(1.05)" },
        },
      },
      animation: {
        fadeMove: "fadeMove 18s ease-in-out infinite",
        fadeMoveReverse: "fadeMoveReverse 24s ease-in-out infinite",
        blob: "blob 15s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
