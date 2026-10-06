import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#f5f5f5',
        surface: '#ffffff',
        sky: { DEFAULT: '#3fa9dc', soft: '#e2f2fa' },
        lime: { DEFAULT: '#9bcd3e', soft: '#eef7dd' },
        sun: { DEFAULT: '#f6c743', soft: '#fdf3d8' },
        rose: { DEFAULT: '#f58fae', soft: '#fdeaf0' },
        mint: { DEFAULT: '#62ccbd', soft: '#e0f6f3' },
        ink: {
          DEFAULT: '#3a3a3a',
          soft: '#7b7b7b',
          mute: '#a5a5a5',
          faint: '#c8c8c8',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'var(--font-noto-kr)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
