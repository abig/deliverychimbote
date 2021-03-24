module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    colors: {
      'alice-blue': '#ebf2fa', // page and dropdown background
      sand: '#f3d2c1', // borders on index
      'sand-light': '#fef6e4',
      orange: '#F26419', // index accent (title, intro)
      indigo: '#103F5E', // primary accent
      'indigo-light': '#175676', // index intro text and others
      teal: '#8bd3dd', // secondary accent (btn-secondary bg)
      white: '#fff', // white text
      facebook: '#3b5998', // facebook
      instagram: '#bc2a8d', // instagram
      twitter: '#1da1f2', // twitter
      whatsapp: '#4fce5d' // whatsapp
    },
    fontFamily: {
      inter:
        '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'inter-var':
        '"Inter var", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'fredoka-one':
        '"Fredoka One", cursive, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        '128': '32rem',
      },
    },
  },
  variants: {
    extends: {
      margin: ['responsive', 'last'],
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      backgroundColor: ['checked'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
