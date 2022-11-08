import type { AppProps } from 'next/app'
import { Container, Header } from '../styles/pages/app'
import { globalStyles } from '../styles/global'

import { Handbag } from 'phosphor-react'

import Image from 'next/future/image'
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

        <button>
          <Handbag size={24} weight="bold" />
        </button>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
