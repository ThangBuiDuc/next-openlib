/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      colors: {
        hovercl: "rgba(0, 0, 0, 0.05)",
        bordercl: "#cccccc",
        calendarBoder: "#27aecb",
        overlay: "rgba(0,0,0,.5)",
      },
    },
  },

  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: "#0083C2",
  //       },
  //     },
  //   ],
  // },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("daisyui"),
  ],
};
