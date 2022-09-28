import { globalCss } from ".";


export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: '$gray900',
    color: '$gray100'
  },

  'body, input, button, textarea': {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: '1rem'
  }
})