/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "sea-green": "#163d32",
        "sea-green-dark": "#0f2a22",
        "sea-teal": "#1db9a5",
        "sea-teal-dark": "#159684",
        "sea-ink": "#1a2e2a",
        "sea-muted": "#6b7f79"
      }
    }
  },
  plugins: []
};
