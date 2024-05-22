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
          DEFAULT: "#f0d7a7",
          dark: "#c7a97f",
        },
        secondary:{
          DEFAULT: "#c37960",
          dark: "#9e4f3f",
        },
        tertiary:{
          DEFAULT: "#894e3f",
          dark: "#5c2d1f",
        },
          
      },
    },
  },
  plugins: [],
};
