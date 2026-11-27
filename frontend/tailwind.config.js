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
          orange: '#FB7336',
          yellow: '#FCC241',
        },
        surface: {
          white: '#FFFFFF',
          warm: '#FFF9F5',
          light: '#FFF0E8',
        },
        charcoal: {
          DEFAULT: '#242424',
          muted: '#666666',
        },
        border: {
          subtle: '#EEEEEE',
        },
      },
      fontFamily: {
        heading: ['Arial', 'Helvetica', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '18px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #FB7336 0%, #FCC241 100%)',
        'brand-gradient-hover': 'linear-gradient(90deg, #f0672b 0%, #ebb638 100%)',
      },
      boxShadow: {
        'brand-subtle': '0 4px 14px 0 rgba(251, 115, 54, 0.15)',
        'card-subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
