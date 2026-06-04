import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        surface: '#FFFFFF',
        'surface-secondary': '#F5F4F1',
        accent: '#1A56FF',
        'accent-hover': '#1445E0',
        'accent-secondary': '#E8E3DC',
        destructive: '#D63F3F',
        'text-primary': '#0A0A0A',
        'text-muted': '#6B6B6B',
        border: '#E8E3DC',
        'status-draft': '#6B6B6B',
        'status-active': '#1A6B3A',
        'status-review': '#92590A',
        'status-archived': '#6B6B6B',
      },
      fontFamily: {
        display: ['DM Sans', 'system-ui', 'sans-serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px', // keep for avatars/badges only when explicitly needed
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.12)',
        focus: '0 0 0 2px #1A56FF',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '400': '400ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 300ms ease forwards',
        'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slide-in-left 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #0A0A0A 1px, transparent 1px)',
        'line-grid': 'linear-gradient(#E8E3DC 1px, transparent 1px), linear-gradient(90deg, #E8E3DC 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
        'line-grid': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
