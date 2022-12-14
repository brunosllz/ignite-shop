import { css, styled } from '../../styles'

export const overlay = css({
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  inset: 0,
})

export const content = css({
  position: 'fixed',
  backgroundColor: '$gray800',
  width: '480px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '5px 5px 10px 8px rgba(0,0,0,.8)',

  padding: '3rem',
  bottom: 0,
  top: 0,
  right: 0,

  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5rem',
    width: '100%',

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },

    button: {
      backgroundColor: '$green500',
      borderRadius: 8,
      width: '100%',
      color: '$white',
      padding: '1.25rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '$md',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },
    },
  },
})

export const ContentDetails = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  overflowY: 'auto',

  h2: {
    fontSize: '$lg',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    svg: {
      marginBottom: '16px',
    },

    span: {
      fontSize: '$md',
      lineHeight: '1.6rem',
    },
  },
})

export const closeButton = css({
  border: 0,
  backgroundColor: 'transparent',
  color: '$gray400',
  position: 'absolute',
  cursor: 'pointer',
  top: 24,
  right: 24,
})

export const CheckoutProductCard = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  marginTop: '2rem',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101,
  height: 93,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const CheckoutProductCardDetails = styled('div', {
  gap: '0.5rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  span: {
    display: 'block',
    fontSize: '1.125rem',
    color: '$gray300',
  },

  strong: {
    fontSize: '1.125rem',
    color: '$gray100',
  },

  button: {
    border: 0,
    backgroundColor: 'transparent',
    color: '$green500',
    textAlign: 'left',
    cursor: 'pointer',
  },
})

export const CheckoutDetailsAmount = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  span: {
    '&:last-child': {
      fontSize: '$md',
      color: '$gray300',
    },
  },
})

export const CheckoutDetailsTotalValue = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  span: {
    fontSize: '$md',
  },

  strong: {
    fontSize: '$xl',
  },
})
