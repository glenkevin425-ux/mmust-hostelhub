/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B5CAB",
          navy: "#0B1F3A",
          light: "#EAF4FF",
        },
        bg: "#F7F9FC",
        ink: "#111827",
        subink: "#64748B",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,0.06), 0 1px 3px rgba(11,31,58,0.08)",
        cardHover: "0 8px 20px rgba(11,31,58,0.12)",
      },
    },
  },
  plugins: [],
}
