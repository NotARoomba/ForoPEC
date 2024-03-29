/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fl-bg': '#F0F3E0',
        'fl-text': '#FCFDE9',
        'fl-y': '#FDCB04',
        'fl-ly': '#FEE272',
        'fl-b': '#073E87',
        'fl-r': '#D8011B',
        'fl-g': '#16BA65',
        'fl-yy': '#d5ecfa',
        'fl-ys': '#BCCFDC',
        'fl-dg': '#026D36',
      },
    },
    fontFamily: {
      sans: ['"Inter"'],
    },
  },
  plugins: [],
};
