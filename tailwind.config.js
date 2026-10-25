/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Midnight Obsidian Canvas
        emerald: {
          950: '#0B0F19',
          900: '#111827',
          850: '#151E32',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        // Electric Neon Cyan & Sky
        turquoise: {
          400: '#38BDF8',
          500: '#06B6D4',
          600: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
        // Sunny Electric Amber & Gold
        champagne: {
          300: '#FDE047',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          glow: 'rgba(245, 158, 11, 0.4)',
        },
        // Crisp Modern Canvas & Slate
        ivory: {
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
        },
        navy: {
          950: '#0A0E1A',
          900: '#0F172A',
          850: '#141E33',
          800: '#1E293B',
          700: '#334155',
        },
        // Casual High-Dopamine Vibe Accents
        vibe: {
          purple: '#8B5CF6',
          purpleLight: '#A78BFA',
          pink: '#EC4899',
          pinkLight: '#F472B6',
          coral: '#F43F5E',
          coralLight: '#FB7185',
          cyan: '#06B6D4',
          cyanLight: '#38BDF8',
          amber: '#F59E0B',
          amberLight: '#FBBF24',
          lime: '#10B981',
          limeLight: '#34D399',
        },
        accent: {
          cyan: '#06B6D4',
          cyanLight: '#38BDF8',
          gold: '#FBBF24',
          goldLight: '#FDE047',
          emerald: '#10B981',
          emeraldLight: '#34D399',
          purple: '#8B5CF6',
          violet: '#8B5CF6',
          rose: '#F43F5E',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'casual-mesh': 'radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.22) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.20) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(244, 63, 94, 0.16) 0px, transparent 60%), radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.95) 0px, transparent 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'gateway-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 35%, rgba(10, 14, 26, 0) 70%)',
      },
      boxShadow: {
        'glow-turquoise': '0 0 35px -5px rgba(6, 182, 212, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.4)',
        'glow-gold': '0 0 35px -5px rgba(245, 158, 11, 0.4)',
        'glow-amber': '0 0 35px -5px rgba(245, 158, 11, 0.4)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'glow-violet': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'glow-pink': '0 0 35px -5px rgba(236, 72, 153, 0.45)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(139, 92, 246, 0.18)',
        'glow-card-hover': '0 16px 36px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
