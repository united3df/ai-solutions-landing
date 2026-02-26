import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dev: {
          bg: '#0a0a08',
          surface: '#111110',
          border: '#1e1e1a',
          accent: '#e8ff47',
          text: '#e8e6df',
          muted: '#6b6960',
        },
      },
      fontFamily: {
        'dev-display': ['Bebas Neue', 'sans-serif'],
        'dev-mono': ['DM Mono', 'monospace'],
        'dev-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
