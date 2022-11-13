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
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      shouldPersist
      successUrl="stripe.com"
      cancelUrl="localhost:3000"
      currency="BRL"
      billingAddressCollection={true}
    >
      <ToastContainer />
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
