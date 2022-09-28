import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta Beyond the Limits</h1>
        <span>R$ 79,90</span>
        <p>
          Tempus fermentum eget lacus, quis ante. Potenti sit pharetra,
          ridiculus amet. Bibendum pretium arcu arcu eget viverra at metus donec
          hendrerit. Rhoncus, nunc, eu at ac. At massa, fermentum amet ornare
          cras tincidunt nunc tincidunt. Netus lorem nulla nulla mattis integer
          velit dictum proin nibh.
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
