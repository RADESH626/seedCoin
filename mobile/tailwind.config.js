/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter_500Medium', 'sans-serif'], // Usamos la fuente Inter que instalamos
      },
      colors: {
        seed: {
            50: '#e9f2ff',
            100: '#d7e7ff',
            200: '#b7d3ff',
            300: '#8cb4ff',
            400: '#5f87ff',
            500: '#3b5bff',
            600: '#192aff', 
            700: '#1f2cf4',
            800: '#101ec3',
            900: '#172598',
            950: '#0d1259',
        },
        dark: {
            900: '#050B14', // Fondo principal
            800: '#0F172A', // Tarjetas principales
            700: '#1E293B', // Bordes ligeros
        }
      }
    },
  },
  plugins: [],
}
