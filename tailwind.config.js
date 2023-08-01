/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fl-y': '#FECB02',
        'fl-b': '#073E87',
        'fl-r': '#D8011B',
        'fl-g': '#16BA65',
      },
    },
  },
  plugins: [],
};
