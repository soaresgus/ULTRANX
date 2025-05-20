/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        italiana: 'var(--font-italiana)',
        jomhuria: 'var(--font-jomhuria)',
      },
      colors: {
        'light-purple': 'var(--light-purple)',
      },
    },
  },
  plugins: [],
};
