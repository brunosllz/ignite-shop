import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { products } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed.' })
  }

  if (!products) {
    return res.status(400).json({ error: 'Products not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/product/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const arrayOfProducts = Object.keys(products).map((key) => products[key])

  const pricesId = arrayOfProducts.map((product) => product.priceId)

  const lineItems = pricesId.map((priceId) => {
    return {
      price: priceId,
      quantity: 1,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    cancel_url: cancelUrl,
    success_url: successUrl,
    line_items: lineItems,
  })

  console.log(checkoutSession)

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
