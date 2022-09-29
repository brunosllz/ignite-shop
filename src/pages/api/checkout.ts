import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceId = 'price_1Ln37LCWaUumr0iXjp9B6mMI'

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/product/success`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    cancel_url: cancelUrl,
    success_url: successUrl,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
