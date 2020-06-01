module.exports = {
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
      twitter: '#1da1f2' // twitter
    },
    fontFamily: {
      inter:
        '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'inter-var':
        '"Inter var", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      oswald:
        '"Oswald", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'fredoka-one':
        '"Fredoka One", cursive, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {
      boxShadow: {
        outline: '0 0 0 2px #f582ae',
      },
      spacing: {
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
    },
    customForms: theme => ({
      default: {
        'checkbox, input, multiselect, radio, select, textarea': {
          backgroundColor: theme('color.sand-light'),
          borderColor: theme('colors.indigo'),
          borderRadius: theme('borderRadius.none'),
          borderWidth: theme('borderWidth.2'),
          '&:focus': {
            borderColor: theme('colors.indigo'),
            boxShadow: theme('boxShadow.outline'),
          },
        },
        'checkbox, radio': {
          '&:checked': {
            backgroundColor: theme('colors.indigo'),
          },
        },
        'input, multiselect, select, textarea': {
          width: theme('width.full'),
        },
      },
    }),
  },
  variants: {
    margin: ['responsive', 'last'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [require('@tailwindcss/custom-forms')]
}
