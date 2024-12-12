/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E201E",
        primaryContent: "#ECDFCC",
        actions: "#3C3D37",
        actionsHover: "#697565",
      },
    },
  },
  plugins: [],
};
