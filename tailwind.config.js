/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fef5f5',
          100: '#fce7e7',
          200: '#f9cfd0',
          300: '#f5b7b8',
          400: '#f09fa0',
          500: '#eb8788',
          600: '#c41e3a',
          700: '#b3261e',
          800: '#800000',
          900: '#5c0a0a',
        },
      },
    },
  },
  plugins: [],
};
