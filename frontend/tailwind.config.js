/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uynam: "#002366", // Màu xanh đặc trưng cho Xây dựng Uy Nam
      }
    },
  },
  plugins: [],
}