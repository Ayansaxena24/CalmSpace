/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable the 'dark' variant for backgroundColor utilities
      textColor: ['dark'],       // Enable the 'dark' variant for textColor utilities
    },
  },
}