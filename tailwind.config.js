/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        epr: {
          green: '#10b981',
          'green-dark': '#065f46',
          'green-light': '#ecfdf5',
          'green-border': '#a7f3d0',
          navy: '#1e293b',
          'navy-dark': '#0f172a',
        }
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
