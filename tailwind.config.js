/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line ensures Tailwind scans all relevant file types
    "./public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "accent-muted":
          "linear-gradient(135deg, #6a40ff 0%, rgba(106, 64, 255, 0.3) 100%)",
        "accent-pink": "linear-gradient(135deg, #6a40ff 0%, #ff6b9d 100%)",
        "accent-blue": "linear-gradient(135deg, #6a40ff 0%, #4facfe 100%)",
      },
    },
  },
  plugins: [],
};
