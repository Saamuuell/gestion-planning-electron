/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bakery-yellow": "#FFA500", // Couleur jaune orangé
        "bakery-gray": "#6E6E6E", // Couleur gris foncé
        "bakery-white": "#FFFFFF", // Couleur blanche
      },
    },
  },
  plugins: [],
};
