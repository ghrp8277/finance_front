module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neon-green": "#44d62c",
      },
      keyframes: {
        bounceIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "60%": {
            transform: "scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        bounceIn: "bounceIn 0.4s ease-out",
        fadeOut: "fadeOut 0.4s ease-out",
        spin: "spin 2s linear infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};
