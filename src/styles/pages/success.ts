import { styled } from '..'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  ul: {
    display: 'flex',
    alignItems: 'center',
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('li', {
  width: '100%',
  maxWidth: 140,
  height: 140,
  borderRadius: 999,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  padding: '0.25rem',
  marginTop: '4rem',
  boxShadow: '5px 5px 15px 2px rgba(0,0,0,.8)',

  '&:not(:only-child)': {
    marginRight: -42,
  },

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
