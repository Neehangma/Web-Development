/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6', // teal-500
          light: '#5eead4',  // teal-300
          dark: '#0f766e',   // teal-700
        },
        accent: {
          DEFAULT: '#f59e42', // orange-400
          light: '#fbbf24',  // orange-300
          dark: '#b45309',   // orange-700
        },
      },
    },
  },
  plugins: [],
};