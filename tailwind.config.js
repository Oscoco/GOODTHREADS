/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'urban-black': '#121212',
          'urban-white': '#FFFFFF',
          'urban-gray': '#F9F9F9',
          'urban-accent': '#2563eb', // Azul moderno para botones
        },
        fontFamily: {
          'sans': ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }