import Stripe from 'stripe'

const { NextResponse } = require('next/server')

export const POST = async (request) => {
  const { priceId } = await request.json()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/pricing',
  })

  console.log(session)
  return NextResponse.json({
    url: session.url,
  })
}
