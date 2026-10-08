/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0A0A',
          secondary: '#151111',
          tertiary: '#1B1616',
        },
        ivory: {
          DEFAULT: '#E8DDD0',
          muted: '#C4B8A9',
          faint: 'rgba(232, 221, 208, 0.15)',
        },
        champagne: {
          DEFAULT: '#BFA78C',
          light: '#D4C1AB',
          dark: '#9E856B',
        },
        plum: {
          DEFAULT: '#4A3543',
          deep: '#2D1017',
          dark: '#1D1217',
          light: '#6B4F62',
        },
        metallic: {
          DEFAULT: '#8C8984',
          light: '#A6A39E',
          dark: '#595652',
        },
      },
      fontFamily: {
        serif: ['Prata', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'micro': '0.18em',
      },
      borderRadius: {
        'arch': '9999px 9999px 0 0',
      },
    },
  },
  plugins: [],
}
