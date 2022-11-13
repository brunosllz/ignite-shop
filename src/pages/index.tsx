import { MouseEvent } from 'react'
import { GetStaticProps } from 'next'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { Product as ProductProps } from 'use-shopping-cart/core/index'
import { useShoppingCart } from 'use-shopping-cart'
import { formatPrice } from '../utils/formatPrice'

import { HomeContainer, Product } from '../styles/pages/home'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Head from 'next/head'

import Image from 'next/future/image'
import { Handbag } from 'phosphor-react'
import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: ProductProps[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.75,
      spacing: 48,
    },
  })

  function handleAddProductToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: ProductProps,
  ) {
    e.preventDefault()

    const findProductId = Object.values(cartDetails).find((item) => {
      return item.id === product.id
    })

    if (findProductId) {
      return toast.error('Você já tem uma unidade deste produto no carinho', {
        autoClose: 1000,
        theme: 'colored',
      })
    }

    addItem(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={520} height={480} />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </div>

                  <button onClick={(e) => handleAddProductToCart(e, product)}>
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hour
  }
}
