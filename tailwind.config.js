/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {

      // 🎨 צבעים יוקרתיים
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FBF7EF',
          200: '#F5ECD6',
          300: '#EDD8B8',
        },

        gold: {
          300: '#F2D7A6',
          400: '#E8C27A',
          500: '#D4AF37', // זהב יוקרתי
          600: '#B8962E',
          700: '#8C6F1F',
        },

        blush: {
          50: '#fff7f9',
          100: '#ffeef2',
          200: '#ffdce4',
          300: '#f8cdd5',
          400: '#f1a8b6',
        },

        luxury: {
          black: '#1A1A1A',
          soft: '#2C2C2C',
        }
      },

      // ✍️ פונטים
      fontFamily: {
        hebrew: ['"Assistant"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        luxury: ['"Cormorant Garamond"', 'serif'],
      },

      // 🌈 גרדיאנטים מוכנים
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F2D7A6, #D4AF37)',
        'luxury-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85))',
        'rose-gold': 'linear-gradient(135deg, #f8cdd5, #D4AF37)',
      },

      // ✨ הצללות (מאוד חשוב ליוקרה)
      boxShadow: {
        luxury: '0 20px 40px rgba(0,0,0,0.15)',
        gold: '0 10px 30px rgba(212,175,55,0.3)',
        soft: '0 8px 20px rgba(0,0,0,0.08)',
      },

      // 🎬 אנימציות
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },

        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },

        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },

        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },

      // 🔠 מרווחים טובים יותר
      letterSpacing: {
        widePlus: '0.15em',
      },

      // 📐 border radius יוקרתי
      borderRadius: {
        luxury: '2rem',
      }
    },
  },
  plugins: [],
}