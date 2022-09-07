/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.svelte',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8006f',
        'primary-darker': '#cf0063',
        secondary: '#369E37',
        error: '#da2d2b',
        surface: '#f7f8fa',
        'surface-darker': '#edeef2',
        background: '#f8eef3',

        'on-primary': '#FFFFFF',
        'on-surface': '#000000',
        'on-surface-light': '#565a69',
        'on-background': '#000000',
      },
      fontFamily: {
        'serif': 'Lora, Georgia, Cambria, "Times New Roman", Times, serif',
        'sans': 'Montserrat, sans-serif',
      },
      flex: {
        '100': '1 1 100%'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
