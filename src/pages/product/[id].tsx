import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import axios from 'axios'
import { useShoppingCart } from 'use-shopping-cart'
import { Product as IProduct } from 'use-shopping-cart/core/index'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'
import Image from 'next/future/image'
import Head from 'next/head'
import { formatPrice } from '../../utils/formatPrice'

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckouSession, setIsCreatingCheckouSession] =
    useState(false)
  const { addItem } = useShoppingCart()

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>...Loading</p>
  }

  function handleAddProductToCart(product: IProduct) {
    addItem(product)
  }

  async function handleCreateCheckout() {
    try {
      setIsCreatingCheckouSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckouSession(false)
      alert('Falha ao redicionar ao checkout!')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={400} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPrice(product.price)}</span>
          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckouSession}
            onClick={() => handleAddProductToCart(product)}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MW5Fy1vyp6dpJC' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
