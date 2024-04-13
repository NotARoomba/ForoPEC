import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "flag-yellow": "#ffcd03",
        "flag-blue": "#003087",
        "flag-red": "#C8102E",
        "pastel-purple": "#d9cdf7",
        "pastel-blue": "#BCD8F0",
        "pastel-light-blue": "#DDEFFF",
        "pastel-dark-blue": "#A0D4FF"
       },
       boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 3px 6px 0 rgba(0, 0, 0, 0.08)',
        'inner-xl': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.1), inset 0 6px 10px 0 rgba(0, 0, 0, 0.08)'
      }, 
      minHeight: {
        '128': '32rem',
        '136': '42rem',
      },
      minWidth: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
};
export default config;
