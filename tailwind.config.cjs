/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.svelte', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        primary: '#e8006f',
        'on-primary': '#FFFFFF',
        'primary-darker': '#cf0063',

        'primary-ghost': '#fdeaf1',
        'on-primary-ghost': '#d50066',

        error: '#da2d2b',

        surface: '#f7f8fa',
        'surface-darker': '#edeef2',
        'on-surface': '#000000',
        'on-surface-lighter': '#565a69',

        'dark_surface': '#191b1f',
        'dark_surface-lighter': '#222429',
        'dark_on-surface': '#ffffff',
        'dark_on-surface-darker': '#c3c5cb',

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
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
