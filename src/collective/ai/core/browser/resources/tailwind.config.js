// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("tailwindcss-animate"),
    // require("@assistant-ui/react-ui/tailwindcss")({
    //   components: ["thread"],
    // }),
    require("@assistant-ui/react/tailwindcss"),
    require("@assistant-ui/react-markdown/tailwindcss"),
  ]
};
