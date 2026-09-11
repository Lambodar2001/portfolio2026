/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-base': '#080808',
        'bg-surface': '#0f0f0f',
        'bg-surface-2': '#141414',
        'bg-surface-3': '#1a1a1a',
        // Accents
        accent: '#e4ff00',
        'accent-cyan': '#00d4ff',
        'accent-purple': '#8b5cf6',
        // Text
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#555555',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        snug: '-0.02em',
        wide: '0.08em',
        wider: '0.15em',
        widest: '0.25em',
      },
      boxShadow: {
        'accent-sm': '0 4px 16px rgba(228, 255, 0, 0.15)',
        'accent-md': '0 8px 32px rgba(228, 255, 0, 0.2)',
        'accent-lg': '0 16px 64px rgba(228, 255, 0, 0.25)',
        'cyan-sm': '0 4px 16px rgba(0, 212, 255, 0.15)',
        'surface': '0 1px 0 rgba(255, 255, 255, 0.04)',
        'card': '0 4px 40px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 16px 60px rgba(0, 0, 0, 0.6)',
        'command': '0 32px 80px rgba(0, 0, 0, 0.6)',
        'portrait': '0 40px 100px rgba(0, 0, 0, 0.8), 0 0 80px rgba(228, 255, 0, 0.06)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scan-line': 'scan-line 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
    },
  },
  plugins: [],
}
