import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./emails/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#E8E0D4",
        ivory: "#F5F0E8",
        champagne: "#C9A96E",
        "dusty-rose": "#C4897B",
        rosewood: "#8B4A47",
        charcoal: "#2C2C2C",
        "burnished-gold": "#A07840",
        cream: "#FAF7F2",
        mist: "#F0EBE3",
        bark: "#6B5B4E",
        parchment: "#EDE5D8",
        smoke: "#9A9490",
        obsidian: "#1A1A1A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.8rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.2rem, 4.5vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.8rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.4rem, 2.5vw, 2.25rem)", { lineHeight: "1.15" }],
        "body-xl": ["1.25rem", { lineHeight: "1.7" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label-lg": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "label-md": ["0.75rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "192": "48rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-right": "slideRight 0.7s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "20%": { transform: "translate(-15%,5%)" },
          "30%": { transform: "translate(7%,-25%)" },
          "40%": { transform: "translate(-5%,25%)" },
          "50%": { transform: "translate(-15%,10%)" },
          "60%": { transform: "translate(15%,0%)" },
          "70%": { transform: "translate(0,15%)" },
          "80%": { transform: "translate(3%,35%)" },
          "90%": { transform: "translate(-10%,10%)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "cinematic": "cubic-bezier(0.77, 0, 0.175, 1)",
        "editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
