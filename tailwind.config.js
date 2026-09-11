/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0e27',
          surface: '#151d3b',
          card: '#1a2847',
          accent: '#0f1929',
        },
        brand: {
          primary: '#00d9ff',
          secondary: '#6366f1',
          accent: '#a78bfa',
          dark: '#0066cc',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
          tertiary: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 0px rgba(0, 217, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 217, 255, 0.6)' },
          '100%': { boxShadow: '0 0 0px rgba(0, 217, 255, 0.4)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(99, 102, 241, 0.5)',
        'glow': '0 0 40px rgba(0, 217, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
