import { useShoppingCart } from 'use-shopping-cart'

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

import { Handbag, X } from 'phosphor-react'
import logoSvg from '../../assets/logo.svg'

export function Header() {
  const { cartDetails, removeItem, cartCount, formattedTotalPrice } =
    useShoppingCart()

  console.log(cartCount)

  function handleRemoveProduct(productId: string) {
    removeItem(productId)
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoSvg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button>
            <Handbag size={24} weight="bold" />
          </button>
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

              <button>Finalizar compra</button>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  )
}
