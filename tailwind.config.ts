import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        berry: {
          50: "#fdf2f8",
          100: "#fce7f3",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
        ocean: {
          50: "#eff6ff",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        leaf: {
          50: "#f0fdf4",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        sunny: {
          50: "#fefce8",
          400: "#facc15",
          500: "#eab308",
        },
      },
      fontFamily: {
        display: ["Baloo 2", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(0,0,0,0.08)",
        card: "0 2px 12px -2px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 28px -6px rgba(0,0,0,0.15)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "pop": { "0%": { transform: "scale(0.9)" }, "50%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "pop": "pop 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
