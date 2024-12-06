const { addDynamicIconSelectors } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundTop: 'var(--background-top)',
        backgroundBttn: 'var(--background-bttn)',
      }
    },
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
  ],
};
