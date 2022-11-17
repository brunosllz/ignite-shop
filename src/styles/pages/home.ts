import { styled } from '..'
import { Swiper } from 'swiper/react'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  minHeight: 696,
  marginBottom: '50px',

  '.swiper': {
    paddingRight: 'calc((100vw / 2) / 1.7) ',
    zIndex: 0,
  },
})

export const SliderContainer = styled(Swiper, {
  '.swiper-wrapper': {
    paddingLeft: 'calc((100vw - 1180px) / 2)',
  },

  '.swiper-button-prev': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 2rem',
    height: '753px',
    width: '126px',

    position: 'absolute',
    top: 0,
    left: 0,
    background: 'linear-gradient(90deg, #121214 0%, rgba(18, 18, 20, 0) 100%)',

    '&::after': {
      display: 'flex',
      color: '$gray300',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '$2xl',
      fontWeight: 'bold',
    },
  },

  '.swiper-button-next': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 2rem',
    height: '753px',
    width: '126px',

    position: 'absolute',
    top: 0,
    right: 0,
    background: 'linear-gradient(-90deg, #121214 0%, rgba(18, 18, 20, 0) 100%)',

    '&::after': {
      display: 'flex',
      color: '$gray300',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '$2xl',
      fontWeight: 'bold',
    },
  },

  '.swiper-button-disabled': {
    display: 'none',
  },
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  minHeight: '696px',
  minWidth: '600px',

  '@bp1': {
    minWidth: '696px',
  },

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.25s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
    },

    strong: {
      fontSize: '$lg',
      color: '$gray300',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    button: {
      padding: '0.75rem',
      backgroundColor: '$green500',
      borderRadius: '6px',
      border: 0,
      width: '3.5rem',
      height: '3.5rem',
      color: '$white',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
