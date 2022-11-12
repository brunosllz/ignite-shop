import type { AppProps } from 'next/app'
import {
  Container,
  Header,
  overlay,
  content,
  CheckoutProductCard,
  ImageContainer,
  CheckoutProductCardDetails,
  closeButton,
  CheckoutDetailsAmount,
  CheckoutDetailsTotalValue,
} from '../styles/pages/app'
import { globalStyles } from '../styles/global'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/future/image'

import { Handbag, X } from 'phosphor-react'

import Link from 'next/link'

import logoSvg from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
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
                  <CheckoutProductCard>
                    <ImageContainer>
                      <Image
                        src="http://www.github.com/brunosllz.png"
                        alt=""
                        width={102}
                        height={93}
                      />
                    </ImageContainer>

                    <CheckoutProductCardDetails>
                      <span>Camiseta Beyond the Limits</span>
                      <strong>R$ 79,90</strong>
                      <button>Remover</button>
                    </CheckoutProductCardDetails>
                  </CheckoutProductCard>
                </ul>
              </div>

              <footer>
                <div>
                  <CheckoutDetailsAmount>
                    <span>Quantidade</span>
                    <span>3 itens</span>
                  </CheckoutDetailsAmount>
                  <CheckoutDetailsTotalValue>
                    <span>Valor total</span>
                    <strong>R$ 270,00</strong>
                  </CheckoutDetailsTotalValue>
                </div>

                <button>Finalizar compra</button>
              </footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
