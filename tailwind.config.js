/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'theme-purple': 'var(--light-purple)',
    },
    extend: {
      fontFamily: {
        italiana: 'var(--font-italiana)',
        jomhuria: 'var(--font-jomhuria)',
      },
    },
  },
  plugins: [],
};
