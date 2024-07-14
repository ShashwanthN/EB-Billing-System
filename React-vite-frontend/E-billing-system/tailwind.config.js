/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'text': '#07070c',
      'background': '#f4f4fa',
      'purple': '#504bb6',
      'primary': '#0a2472',
      'secondary': '#9a97dd',
      'accent': '#6a65d7',
      'white': '#fff',
      'gray': '#404040',
      'gray-2': '#808080',
      'gray-3': '#e7e7e7',
      'error' : "#e23636",
      'success': "#4CAF50"
     },     
  },
  plugins: [],
} );