import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import axios from 'axios'

import {
  HeaderContainer,
  overlay,
  content,
  CheckoutProductCard,
  ImageContainer,
  CheckoutProductCardDetails,
  closeButton,
  CheckoutDetailsAmount,
  CheckoutDetailsTotalValue,
} from './styles'
import Image from 'next/future/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'

import { Handbag, X } from 'phosphor-react'
import logoSvg from '../../assets/logo.svg'

export function Header() {
  const [isCreatingCheckouSession, setIsCreatingCheckouSession] =
    useState(false)
  const { cartDetails, removeItem, cartCount, formattedTotalPrice } =
    useShoppingCart()

  function handleRemoveProduct(productId: string) {
    removeItem(productId)
  }

  const hasProductOnShoopingCart = cartCount > 0

  async function handleCreateCheckout() {
    if (!hasProductOnShoopingCart) {
      return toast.error('Você não tem productos no carrinho', {
        autoClose: 1000,
        theme: 'dark',
      })
    }

    try {
      setIsCreatingCheckouSession(true)

      const response = await axios.post('api/checkout', {
        products: cartDetails,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      toast.error('Falha ao redicionar ao checkout!', {
        autoClose: 1000,
        theme: 'dark',
      })

      console.log('error: ', error)
      setIsCreatingCheckouSession(false)
    }
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoSvg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger>
          <Handbag size={24} weight="bold" />
          {hasProductOnShoopingCart && <div>{cartCount}</div>}
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={overlay()} />
          <Dialog.Content className={content()}>
            <div>
              <Dialog.Title>Sacola de compras</Dialog.Title>
              <Dialog.Close className={closeButton()}>
                <X size={24} weight="bold" />
              </Dialog.Close>

              <ul>
                {Object.values(cartDetails ?? {}).map((product) => {
                  return (
                    <CheckoutProductCard key={product.id}>
                      <ImageContainer>
                        <Image
                          src={product.imageUrl}
                          alt=""
                          width={102}
                          height={93}
                        />
                      </ImageContainer>

                      <CheckoutProductCardDetails>
                        <span>{product.name}</span>
                        <strong>{product.formattedValue}</strong>
                        <button onClick={() => handleRemoveProduct(product.id)}>
                          Remover
                        </button>
                      </CheckoutProductCardDetails>
                    </CheckoutProductCard>
                  )
                })}
              </ul>
            </div>

            <footer>
              <div>
                <CheckoutDetailsAmount>
                  <span>Quantidade</span>
                  <span>
                    {cartCount === 1
                      ? `${cartCount} item`
                      : `${cartCount} items`}
                  </span>
                </CheckoutDetailsAmount>
                <CheckoutDetailsTotalValue>
                  <span>Valor total</span>
                  <strong>{formattedTotalPrice}</strong>
                </CheckoutDetailsTotalValue>
              </div>

              <button
                disabled={!hasProductOnShoopingCart || isCreatingCheckouSession}
                onClick={handleCreateCheckout}
              >
                Finalizar compra
              </button>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  )
}
