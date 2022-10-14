/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      screens: {
        sm: '540px'
      }
    },
    colors: {
      primary: {
        light: 'var(--primary-light)',
        DEFAULT: '#666EFF',
        dark: 'var(--primary-dark)'
      },
      contrast: 'var(--contrast)',
      transparent: 'transparent',
      black: '#101111',
      white: '#fff',
      gray: {
        50: '#f8f8f8',
        100: '#EDEEEE',
        200: '#E6E7E7',
        300: '#DBDCDC',
        400: '#878888',
        500: '#686E6E',
        600: '#404141',
        700: '#343535',
        800: '#282929',
        900: '#1D1E1E'
      },
      red: {
        50: '#ffe0e1',
        400: '#FF656B',
        500: '#cc5156'
      },
      green: {
        400: '#1FDA8A'
      },
      orange: {
        400: '#FFAB2E'
      }
    },
    fontFamily: {
      sans: ['Manrope', 'ui-sans-serif', 'sans-serif']
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.200', 'currentColor')
    }),
    extend: {
      fontSize: {
        md: '1rem',
        lg: '2rem'
      },
      transitionProperty: {
        bg: 'background'
      }
    }
  },
  plugins: []
}
