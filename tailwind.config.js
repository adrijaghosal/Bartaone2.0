/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EDF2',
          100: '#C5D0DD',
          200: '#9EB3C7',
          300: '#7795B1',
          400: '#5078A0',
          500: '#2A5B8F',
          600: '#224A75',
          700: '#1A395A',
          800: '#122840',
          900: '#0A1825',
          950: '#060E16',
        },
        warmBeige: {
          50: '#FDF8F2',
          100: '#FAF0E3',
          200: '#F5E1C7',
          300: '#F0D2AB',
          400: '#EBC38F',
          500: '#E6B473',
          600: '#DBA55F',
          700: '#CD944D',
          800: '#BF833B',
          900: '#B17229',
          950: '#8F5A1A',
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#FCE6DF',
          200: '#F9CDBF',
          300: '#F6B49F',
          400: '#F39B7F',
          500: '#E8835F',
          600: '#D66F4A',
          700: '#C45B35',
          800: '#B24720',
          900: '#A0330B',
          950: '#7A2608',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}