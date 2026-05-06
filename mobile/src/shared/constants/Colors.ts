const tintColorLight = '#2f95dc';
const tintColorDark = '#3b5bff';

export default {
  // Paleta extraída del mockup
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
  darkPalette: {
    900: '#050B14', // Fondo principal
    800: '#0F172A', // Tarjetas principales
    700: '#1E293B', // Bordes ligeros
  },
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#050B14',
    tint: tintColorDark,
    tabIconDefault: '#475569',
    tabIconSelected: tintColorDark,
  },
};
