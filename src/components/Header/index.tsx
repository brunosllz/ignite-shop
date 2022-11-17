import { useShoppingCart } from 'use-shopping-cart'

import { HeaderContainer } from './styles'
import Image from 'next/future/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'

import { Handbag } from 'phosphor-react'
import logoSvg from '../../../public/logo.svg'
import { CartShoppingCheckout } from '../CartShoppingCheckout'

export function Header() {
  const { cartCount } = useShoppingCart()

  const hasProductOnShoopingCart = cartCount > 0

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

        <CartShoppingCheckout />
      </Dialog.Root>
    </HeaderContainer>
  )
}
