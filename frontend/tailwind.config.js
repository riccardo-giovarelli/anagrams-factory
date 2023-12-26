/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        af: {
          100: '#ff751a',
          600: '#0284c7',
          900: '#0c4a6e',
        },
      }
    },
  },
  plugins: [],
}

