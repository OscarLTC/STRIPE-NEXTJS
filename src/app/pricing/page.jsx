import { Stripe } from 'stripe'
import { ButtonCheckout } from '../../components/ButtonCheckout'

const loadPrices = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const prices = await stripe.prices.list()
  const sortedPrices = prices.data.sort((a, b) => a.unit_amount - b.unit_amount)
  return sortedPrices
}

const PricingPage = async () => {
  const prices = await loadPrices()
  console.log(prices)

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <header>
          <h1 className='text-center my-5'>Pricing</h1>
        </header>
        <div className='flex gap-2'>
          {prices.map((prices) => (
            <div key={prices.id} className='bg-slate-300 mb-2 p-7'>
              <h3>{prices.nickname}</h3>
              <h2 className='text-3xl font-bold'>
                {prices.unit_amount / 100}$
              </h2>
              <ButtonCheckout priceId={prices.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPage
