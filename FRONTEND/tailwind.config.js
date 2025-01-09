// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Make sure to include your file paths
  ],
  theme: {
    extend: {
      animation: {
        'loading-line': 'loading-line 2s infinite', // Define the animation name and duration
      },
      keyframes: {
        'loading-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
