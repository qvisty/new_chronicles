/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdf8f0',
          100: '#f9eedb',
          200: '#f3dbb6',
          300: '#e9c27e',
          400: '#dea44a',
          500: '#c8882a',
          600: '#a86b1e',
          700: '#85511a',
          800: '#6b3f1a',
          900: '#593318',
        },
        ink: {
          50: '#f4f3f0',
          900: '#1c1a14',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
