/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dark theme with Catalyst design language
        chronicle: {
          bg: '#0a0a0f',
          card: '#111118',
          raised: '#1a1a24',
          surface: '#16161f',
          border: '#252530',
          text: '#e8e4dc',
          muted: '#8a8070',
          dim: '#5a5650',
        },
        // Catalyst acid accent (adapted for dark theme)
        acid: {
          DEFAULT: '#C8E600',
          hover: '#b8d400',
          dim: 'rgba(200, 230, 0, 0.08)',
          glow: 'rgba(200, 230, 0, 0.15)',
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
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Georgia', "'Palatino Linotype'", 'Palatino', 'serif'],
      },
      borderRadius: {
        'catalyst': '16px',
      },
      transitionTimingFunction: {
        'catalyst': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'card-inset': 'inset 0 1px 0 rgba(255,255,255,0.03)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
