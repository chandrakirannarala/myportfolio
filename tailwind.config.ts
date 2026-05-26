import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base:    'var(--color-base)',
        surface: 'var(--color-surface)',
        border:  'rgba(255,255,255,0.08)',
        muted:   '#888888',
        pill:    'var(--color-pill)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};

export default config;