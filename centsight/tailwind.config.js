/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      headline: ['Inter'],
      body: ['Poppins'],
    },
    extend: {
      colors: {
        customOrange: '#f0652f', // Custom HEX color
        customBlue: '#007bff', // Another custom HEX color
        // Add more custom colors as needed
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
      themes: {
        dark: {
          layout: {},
          colors: {
            primary: '#2d523d',
            yellow: '#f2e291',
            yellowOrange: '#f2b84b',
            orange: '#f28749',
            text: '#ffffff',
          },
        },
      },
    }),
  ],
};
