/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          alert: withOpacity("--color-text-alert"),
        }
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          'fill-inverted': withOpacity("--color-fill-inverted"),
          'button-accent': withOpacity("--color-button-accent"),
          'button-accent-hover': withOpacity("--color-button-accent-hover"),
          'card': withOpacity("--color-card"),
          'card-hover': withOpacity("--color-card-hover"),
        }
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
