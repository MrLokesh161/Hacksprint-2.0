/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'among-cyan': '#75DBF4',
        'among-blue': '#235685',
        'among-red': '#F21717',
        'among-red-dark': '#C51111',
        'space-black': '#000000',
      },
      fontFamily: {
        'game': ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { 
            textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
          },
          '50%': { 
            textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)',
          },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(239,68,68,0.6)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 60px rgba(239,68,68,0.9)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
}
