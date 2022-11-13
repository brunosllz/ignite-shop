import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'

import { ImageContainer, SuccessContainer } from '../../styles/pages/success'
import Link from 'next/link'
import Stripe from 'stripe'
import { useEffect } from 'react'

interface SuccesssProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccesssProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    function clearShoppingCart() {
      clearCart()
    }

    clearShoppingCart()
  }, [clearCart])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={127} height={145} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
