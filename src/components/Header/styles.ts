import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  display: 'flex',
  margin: '0 auto',
  justifyContent: 'space-between',

  button: {
    padding: '0.75rem',
    position: 'relative',
    backgroundColor: '$gray800',
    borderRadius: '6px',
    border: 0,
    width: '3rem',
    height: '3rem',
    color: '$gray400',
    cursor: 'pointer',

    div: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 99,

      color: '$white',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      backgroundColor: '$green500',

      width: '24px',
      height: '24px',

      position: 'absolute',
      top: -8,
      right: -8,
    },
  },
})
