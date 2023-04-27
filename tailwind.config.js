/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pink-light": "#DDBEBE",
        "pink-dark": "#975555",
        "grey-dark": "#424242",
        "grey-light": "#F6F6F6",
      },
    },
  },
  plugins: [],
};
