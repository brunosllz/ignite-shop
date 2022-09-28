import type { AppProps } from 'next/app'
import Image from 'next/future/image'
import {
  Container,
  Header
} from '../styles/pages/app'
import { globalStyles } from '../styles/global'

import logoSvg from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoSvg} alt='' />
      </Header>

      <Component {...pageProps} />
    </Container>

  )
}