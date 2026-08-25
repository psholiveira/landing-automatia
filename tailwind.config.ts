import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0b2a5b",
        brand: "#1a73c8",
        sky: "#6fabe8",
        skyMuted: "#7fb4ea",
        skyPale: "#cfe3f7",
        ground: "#f3f2f2",
        surface: "#eae9e9",
        ink: "#201e1d",
        ash: "#605d5d",
        smoke: "#8b8787",
        rule: "#dcd8d8",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1.4s steps(1) infinite",
      },
      borderRadius: { none: "0px" },
    },
  },
  plugins: [],
};

export default config;
