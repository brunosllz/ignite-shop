import {
  overlay,
  content,
  CheckoutProductCard,
  ImageContainer,
  CheckoutProductCardDetails,
  closeButton,
  CheckoutDetailsAmount,
  CheckoutDetailsTotalValue,
  ContentDetails,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/future/image'
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShoppingCart, X } from 'phosphor-react'

export function CartShoppingCheckout() {
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
    <Dialog.Portal>
      <Dialog.Overlay className={overlay()} />
      <Dialog.Content className={content()}>
        <ContentDetails>
          <Dialog.Title>Sacola de compras</Dialog.Title>
          <Dialog.Close className={closeButton()}>
            <X size={24} weight="bold" />
          </Dialog.Close>

          {!hasProductOnShoopingCart && (
            <div>
              <ShoppingCart size={32} />
              <span>Seu carinho está vazio</span>
              <span>Continue comprando!</span>
            </div>
          )}
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
        </ContentDetails>

        <footer>
          <div>
            <CheckoutDetailsAmount>
              <span>Quantidade</span>
              <span>
                {cartCount === 1 ? `${cartCount} item` : `${cartCount} items`}
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
  )
}
