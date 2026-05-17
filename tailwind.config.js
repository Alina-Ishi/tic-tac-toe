/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'win-pulse': 'winPulse 0.6s ease-in-out 3',
      },
      keyframes: {
        winPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.1)', filter: 'brightness(1.2)' },
        },
      },
    },
  },
  plugins: [],
}