/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
