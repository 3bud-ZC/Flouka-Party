import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FAF7F0",
          100: "#F4ECD8",
          200: "#EFE6D5",
          300: "#E5D8BF",
          400: "#D8C7A5",
          DEFAULT: "#EFE6D5",
          dark: "#E2D5BE",
        },
        ink: {
          DEFAULT: "#171B1E",
          soft: "#23282D",
          deep: "#0F1214",
          muted: "#4A525A",
        },
        terracotta: {
          DEFAULT: "#D95338",
          dark: "#B83E26",
          light: "#E76C53",
          glow: "#FF7B60",
        },
        egyptian: {
          green: "#45533F",
          "green-dark": "#313D2D",
          "green-light": "#586A51",
          gold: "#D4A359",
          sand: "#DFD1B5",
        },
      },
      fontFamily: {
        display: ["Shrikhand", "cursive", "Georgia", "serif"],
        heading: ["\"Abril Fatface\"", "Georgia", "serif"],
        body: ["\"Plus Jakarta Sans\"", "system-ui", "-apple-system", "sans-serif"],
        mono: ["\"Space Mono\"", "ui-monospace", "monospace"],
      },
      boxShadow: {
        vintage: "4px 4px 0px 0px #171B1E",
        "vintage-lg": "8px 8px 0px 0px #171B1E",
        "vintage-terracotta": "4px 4px 0px 0px #D95338",
        "vintage-green": "4px 4px 0px 0px #45533F",
        stamp: "2px 2px 0px 0px #171B1E",
      },
      borderWidth: {
        3: "3px",
      },
      animation: {
        "wave-slow": "wave 8s ease-in-out infinite",
        "float-gentle": "float 5s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(1deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
