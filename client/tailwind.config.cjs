/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        blue: "#2676fc",
        green: "#27995a ",
        dark: "#202424 ",
        light: "#fcf7f6",
        gray: "#53595D",
      },
      backgroundImage: {
        landing: "url('URLDEIMAGEN')",
        home: "url('../public/bg.svg')",
        home1: "url('URLDEIMAGEN')",
        home2: "url('URLDEIMAGEN')",
        search:
          "url('https://res.cloudinary.com/dyzge4vha/image/upload/v1669352622/Untitled_1-1525x709_18_g27g3f.png')",
      },
    },
  },
  plugins: [],
};
