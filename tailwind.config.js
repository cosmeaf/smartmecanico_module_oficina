/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F2937",
          light: "#3E4C59",
          dark: "#0B1723",
        },
        secondary: {
          DEFAULT: "#3F8CFF",
          light: "#6DA8FF",
          dark: "#206BCC",
        },
        background: {
          DEFAULT: "#F5F7FA",
          dark: "#E4E7EB",
        },
        text: {
          primary: "#1A202C",
          secondary: "#718096",
        },
        success: {
          DEFAULT: "#48BB78",
          dark: "#2F855A",
        },
        error: {
          DEFAULT: "#E53E3E",
          dark: "#C53030",
        },
        header: {
          DEFAULT: "#2D3748",
          hover: "#4A5568",
        },
      },
    },
  },
  plugins: [],
};
