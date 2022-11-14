import { MouseEvent } from 'react'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { Product as ProductProps } from 'use-shopping-cart/core/index'
import { useShoppingCart } from 'use-shopping-cart'
import { formatPrice } from '../utils/formatPrice'

import { HomeContainer, Product, SliderContainer } from '../styles/pages/home'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Head from 'next/head'
import { SwiperSlide, SwiperProps } from 'swiper/react'
import { Navigation } from 'swiper'

import Image from 'next/future/image'
import { Handbag } from 'phosphor-react'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

interface HomeProps {
  products: ProductProps[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()

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

    toast.success('Produto adicionado ao carrinho.', {
      autoClose: 1000,
      theme: 'dark',
    })
    addItem(product)
  }

  const swipersSettings: SwiperProps = {
    spaceBetween: 48,
    slidesPerView: 2,
    navigation: true,
    draggable: true,
    // breakpoints: {
    //   768: {
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //   },
    //   900: {
    //     slidesPerView: 3,
    //     spaceBetween: 24,
    //   },
    //   1146: {
    //     slidesPerView: 4,
    //     spaceBetween: 24,
    //   },
    //   1330: {
    //     slidesPerView: 5,
    //     spaceBetween: 24,
    //   },
    // },
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer>
        <SliderContainer modules={[Navigation]} {...swipersSettings}>
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Product>
                    <Image
                      src={product.imageUrl}
                      alt=""
                      width={520}
                      height={480}
                    />

                    <footer>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{formatPrice(product.price)}</span>
                      </div>

                      <button
                        onClick={(e) => handleAddProductToCart(e, product)}
                      >
                        <Handbag size={32} weight="bold" />
                      </button>
                    </footer>
                  </Product>
                </Link>
              </SwiperSlide>
            )
          })}
        </SliderContainer>
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
      priceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hour
  }
}
