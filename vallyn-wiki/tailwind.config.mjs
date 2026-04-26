/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dark theme inspired by the-chronicles
        chronicle: {
          bg: '#0d0d12',
          card: '#14141e',
          raised: '#1c1c28',
          border: '#2a2a38',
          text: '#ddd4bb',
          muted: '#8a8070',
          dim: '#6a6458',
        },
        // Campaign accent: Chains of the Ancients (red)
        chains: {
          DEFAULT: '#9b2626',
          light: '#c43c3c',
          dim: 'rgba(155, 38, 38, 0.15)',
          glow: 'rgba(155, 38, 38, 0.4)',
        },
        // Campaign accent: Dream of Dawn (gold)
        dawn: {
          DEFAULT: '#c9a227',
          light: '#e8bc30',
          dim: 'rgba(201, 162, 39, 0.12)',
          glow: 'rgba(201, 162, 39, 0.4)',
        },
        // General accent (neutral blue-grey for hub/world pages)
        accent: {
          DEFAULT: '#6a7090',
          light: '#8a90b8',
          dim: 'rgba(106, 112, 144, 0.12)',
        },
        // Keep parchment for backward compat in prose
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
        serif: ['Georgia', "'Palatino Linotype'", 'Palatino', 'serif'],
        sans: ["'Segoe UI'", 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
