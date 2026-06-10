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
        "sea-green": "#0f3d35",
        "sea-teal": "#1db9a5",
        "sea-ink": "#10231f",
        "sea-muted": "#66736f"
      }
    }
  },
  plugins: []
};
