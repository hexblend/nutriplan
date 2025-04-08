export const STORAGE_KEYS = {
  LOGGED_IN_USER_ID: 'LOGGED_IN_USER_ID',
};

export const colors = {
  primary: {
    950: '#010b13', // Darkest blue - Extreme dark backgrounds
    900: '#02141e', // Main background color
    800: '#09283f', // Muted background
    700: '#0b1d2e', // Accent color, slightly lighter than background
    500: '#072337', // Primary color, used for cards
    400: '#1f3e52', // Border, input, and ring color
    350: '#65a5ff', // Bright blue highlights
    300: '#80afca', // Light blue accents
  },
  secondary: {
    900: '#210202', // Darkest red - Deep background accents
    800: '#561010', // Main secondary color - Dark red
    500: '#a41515', // Secondary accent - Medium red
    300: '#d51a1a', // Destructive actions - Bright red
    200: '#ff4747', // Error highlights - Lightest red
  },
  grayscale: {
    white: '#ffffff', // Text and foreground elements
    gray: '#5c5c5c', // Muted text and disabled states
  },
} as const;
