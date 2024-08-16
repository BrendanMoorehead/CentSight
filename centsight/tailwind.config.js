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
      extend: {
        colors: {
          slate: '#64748b',
          gray: '#6b7280',
          zinc: '#71717a',
          neutral: '#737373',
          stone: '#78716c',
          red: '#ef4444',
          orange: '#f97316',
          amber: '#f59e0b',
          yellow: '#eab308',
          lime: '#84cc16',
          green: '#22c55e',
          emerald: '#10b981',
          teal: '#14b8a6',
          cyan: '#06b6d4',
          sky: '#0ea5e9',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#a855f7',
          fuchsia: '#d946ef',
          pink: '#ec4899',
          rose: '#f43f5e',
        },
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
