/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {},
    colors: {
      ...colors,
      'text': '#07070c',
      'background': '#f4f4fa',
      'purple': '#504bb6',
      'primary': '#0a2472',
      'secondary': '#9a97dd',
      'accent': '#6a65d7',
      'white': '#fff',
      'gray': '#404040',
      'gray-1': '#1a1a1c',
      'gray-5': '#242426',
      'gray-2': '#808080',
      'gray-3': '#e7e7e7',
      'gray-4': '#bfbfbf',
      'error' : "#e23636",
      'success': "#68E534"
     },     
  },
  plugins: [],
} );