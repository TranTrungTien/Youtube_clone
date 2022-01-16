module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg_gray_202020: "#202020",
        bg_gray_181818: "#181818",
        lightgray_323232: "#323232",
        fresh_red_cc0000: "#cc0000",
      },
      minHeight: {
        "85vh": "85vh",
        "40vh": "40vh",
      },
      height: {
        "85vh": "85vh",
        "40vh": "40vh",
      },
      maxHeight: {
        "40vh": "40vh",
      },
      fontSize: {
        "7px": "7px",
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      width: ["group-hover"],
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
