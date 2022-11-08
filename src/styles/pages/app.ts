import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  display: 'flex',
  margin: '0 auto',
  justifyContent: 'space-between',

  button: {
    padding: '0.75rem',
    backgroundColor: '$gray800',
    borderRadius: '6px',
    border: 0,
    width: '3rem',
    height: '3rem',
    color: '$gray400',
    cursor: 'pointer',
  },
})
