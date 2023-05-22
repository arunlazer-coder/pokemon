/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      '6p': '6%'
    },
    extend: {
      width: {
        '30pr': '30%',
        '94pr':'90%'
      },
      height: {
        '90pr': '90%',
      }
    },
  },
  plugins: [],
}

