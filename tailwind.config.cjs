/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.svelte', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        primary: '#e8006f',
        'on-primary': '#FFFFFF',
        'primary-hover': '#cf0063',

        'dark_primary': '#ff1a88',
        'dark_on-primary': '#FFFFFF',
        'dark_primary-hover': '#cf0063',

        'primary-ghost': '#fdeaf1',
        'on-primary-ghost': '#d50066',

        error: '#da2d2b',

        surface: '#f7f8fa',
        'surface-hover': '#edeef2',
        'on-surface': '#000000',

        'dark_surface': '#191b1f',
        'dark_surface-hover': '#222429',
        'dark_on-surface': '#ffffff',

        background: '#f8eef3',
        'on-background': '#000000',

        'dark_background': '#2f242e',
        'dark_on-background': '#ffffff',
      },
      fontFamily: {
        serif: 'Lora, Georgia, Cambria, "Times New Roman", Times, serif',
        sans: 'Montserrat, sans-serif',
      },
      flex: {
        100: '1 1 100%',
      },
      zIndex: {
        '1': '1',
      },
      borderRadius: {
        '2xl+1': '1.25rem',
      }
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
