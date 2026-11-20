/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F36F21', // Primary brand orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        warmWhite: '#FFFDF9',
        warmCard: '#FFF9F2',
        charcoal: {
          DEFAULT: '#1E1E24',
          muted: '#64748B',
          light: '#334155'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(243, 111, 33, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 20px 40px -10px rgba(243, 111, 33, 0.12), 0 10px 15px -3px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 25px -3px rgba(243, 111, 33, 0.35)',
      }
    },
  },
  plugins: [],
}

