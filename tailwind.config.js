module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkSecondary: "#1f1f1f",
      },
    },
    fontFamily: {
      sans: ['"Raleway"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
