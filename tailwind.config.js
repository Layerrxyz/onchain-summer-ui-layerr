/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':{
          DEFAULT: "#000000",
          dark: "#ffffff",
        },
        'bg-primary': {
          DEFAULT:'#F5F5F5',
          dark:'#000000',
        },
        'bg-secondary': {
          DEFAULT:'#FFFFFF',
          dark:'#1E1E1E',
        },
      'blue':'#0E76FD',
      'grey':'#7C8187',
      'slider-grey': '#5A6069',
    },
    },
  },
  plugins: [],
}