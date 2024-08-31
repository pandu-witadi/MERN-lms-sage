/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    themes: ["light", "dark", "cupcake"],
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      mono: ["Roboto Mono", "monospace"],
      boogaloo: ['Boogaloo', "sans-serif"]
    },
    extend: {
      colors: {
        "app-base": "#F7D634",
        "app-border": "#F7D634",
        "app-primary": "#275DAD",
        "app-secondary": "#B4A0E5",
        "app-tertiary": "#2CA6A4",
        "app-error": "#F97068",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};