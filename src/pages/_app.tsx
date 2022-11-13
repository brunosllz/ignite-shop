import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { ToastContainer } from 'react-toastify'

import { Container } from '../styles/pages/app'
import { Header } from '../components/Header'

import { globalStyles } from '../styles/global'
import 'react-toastify/dist/ReactToastify.min.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      shouldPersist
      currency="BRL"
    >
      <ToastContainer />
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
