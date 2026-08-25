import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101322",
        muted: "#697386",
        canvas: "#F4F6FA",
        line: "#E7EAF0",
        brand: { DEFAULT: "#5B4CFF", dark: "#4032D4", soft: "#EFEDFF" },
        mint: { DEFAULT: "#19A974", soft: "#E7F8F1" },
        amber: { DEFAULT: "#D97706", soft: "#FFF7E6" },
        rose: { DEFAULT: "#E5484D", soft: "#FFF0F0" }
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 8px 30px rgba(16,24,40,.06)",
        lift: "0 20px 50px rgba(41,35,90,.14)"
      },
      borderRadius: { xl: "14px", "2xl": "20px" },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] }
    }
  },
  plugins: []
} satisfies Config;
