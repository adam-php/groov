/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#030014',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#9333EA',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'rgb(255 255 255 / 0.1)',
          foreground: 'rgb(255 255 255 / 0.5)',
        },
      },
      animation: {
        'gradient': 'gradient 10s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};