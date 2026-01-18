/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Minimal theme
        minimal: {
          bg: '#ffffff',
          card: '#f9fafb',
          text: '#111827',
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#3b82f6',
        },
        // Dark Cyber theme
        cyber: {
          bg: '#0a0e27',
          card: '#111836',
          text: '#e2e8f0',
          primary: '#00f0ff',
          secondary: '#ff00ff',
          accent: '#7c3aed',
        },
        // Ocean Blue theme
        ocean: {
          bg: '#0f172a',
          card: '#1e293b',
          text: '#f1f5f9',
          primary: '#0ea5e9',
          secondary: '#38bdf8',
          accent: '#06b6d4',
        },
        // Forest Green theme
        forest: {
          bg: '#064e3b',
          card: '#065f46',
          text: '#ecfdf5',
          primary: '#10b981',
          secondary: '#34d399',
          accent: '#059669',
        },
        // Sunset Orange theme
        sunset: {
          bg: '#431407',
          card: '#7c2d12',
          text: '#fff7ed',
          primary: '#f97316',
          secondary: '#fb923c',
          accent: '#ea580c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
