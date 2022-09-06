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
        primary: '#FAB89E',
        secondary: '#1D1A31',
        error: '#C73253',
        surface: '#FCD5C5',
        background: '#FFF4EB',

        'on-primary': '#1B1420',
        'on-secondary': '#F5F4F6',
        'on-error': '#F5F4F6',
        'on-surface': '#1B1420',
        'on-background': '#1B1420',
      },
      fontFamily: {
        'fancy': 'ui-serif, Lora, Georgia, Cambria, "Times New Roman", Times, serif',
      },
      flex: {
        '100': '1 1 100%'
      }
    },
  },
  plugins: [],
}
