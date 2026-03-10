import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070b14",
        panel: "#0f1728",
        border: "#253353",
        glow: "#5567ff"
      },
      boxShadow: {
        glow: "0 0 30px rgba(85,103,255,0.25)"
      }
    }
  },
  plugins: []
};

export default config;
