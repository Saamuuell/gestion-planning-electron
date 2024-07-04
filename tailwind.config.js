/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bakery-yellow": "#FFA500", // Couleur jaune orangé
        "bakery-gray": "#6E6E6E", // Couleur gris foncé
        "bakery-white": "#FFFFFF", // Couleur blanche
        primary:{
          DEFAULT: "#0d0f0e",
          dark: "#000",
        },
        secondary:{
          DEFAULT: "#2d2e3a",
          dark: "#3a3c4a",
        },
        tertiary:{
          DEFAULT: "#f1f1fb",
          dark: "#5c2d1f",
        },
          
      },
    },
  },
  plugins: [],
};
