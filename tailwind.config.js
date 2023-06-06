/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue1: "#07203F",
        yellow1: "#FA9F20",
        white1: "#FFAEB",
        peach1: "#FDF0AC",
        peach2: "#FFFAEB",
        blue2: "#5CB8FF",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
