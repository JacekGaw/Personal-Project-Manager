/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#e1c0b6",
        darkcream: "#9d867f",
        darkgrey: "#494949",
        darkjeans: "#243a52",
        darkerjeans: "#111d28",
        dustgold: "#f1af61",
        vibrantgold: "#ff9900",
        jeans: "#4974a5",
        lightcream: "#f3e5e1",
        lightjeans: "#b2c4d9",
        lighterjeans: "#e0e7ef",
      }
    },
  },
  plugins: [],
}