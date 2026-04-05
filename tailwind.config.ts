import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#dce6fb",
          200: "#b9cdf7",
          300: "#8aadf4",
          500: "#3b5fc0",
          600: "#1e40af",
          700: "#1e3a8a",
          800: "#172e6e",
          900: "#0f1f4d",
        },
        cta: {
          DEFAULT: "#16a34a",
          hover:   "#15803d",
          light:   "#dcfce7",
          text:    "#14532d",
        },
        neutral: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          600: "#57534e",
          700: "#44403c",
          900: "#1c1917",
        },
      },
    },
  },
  plugins: [],
};

export default config;
