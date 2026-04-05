import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#050505',
          gold: '#D4AF37',
          gray: '#F5F5F0',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212, 175, 55, 0.15), 0 12px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
