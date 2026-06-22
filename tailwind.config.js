/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#060614',
        navy: '#0b0b14',
        card: '#0e0d28',
        drawer: '#0d0c22',
        announce: '#09091a',
        cream: '#f3efe8',
        'cream-dim': '#e7e2d9',
        muted: '#b8b3a8',
        'muted-2': '#9b958c',
        'muted-3': '#6a6254',
        'muted-4': '#4a4636',
        'muted-5': '#3e3a32',
        gold: '#c4a44a',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        archivo: ['Archivo', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
