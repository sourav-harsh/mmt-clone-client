/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mmtBlue: "#008cff",
        mmtDark: "#051423",
        mmtOrange: "#f68621",
      },
    },
  },
  plugins: [],
};
