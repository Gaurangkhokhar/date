/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dancing': ['"Dancing Script"', 'cursive'],
      },
      colors: {
        'romantic': {
          'dark': '#09090F',
          'deep': '#1A1026',
          'purple': '#2D103F',
          'pink': '#FF69B4',
          'soft-pink': '#FFB6C1',
          'lavender': '#E6E6FA',
          'gold': '#FFD700',
          'neon-pink': '#FF1493',
          'glow': '#FF69B4',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 105, 180, 0.5), 0 0 10px rgba(255, 105, 180, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 105, 180, 0.8), 0 0 40px rgba(255, 105, 180, 0.5)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

