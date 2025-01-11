import { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
})

export default class PaymentController {
  async createCheckoutSession(ctx: HttpContext) {
    try {
      const { amount, successUrl, cancelUrl, coachId, clientId, date } = ctx.request.only([
        'amount',
        'successUrl',
        'cancelUrl',
        'coachId',
        'clientId',
        'date',
      ])

      if (!coachId || !clientId || !date) {
        return ctx.response.status(400).send('Metadata is required')
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: { name: 'Rendez-vous' },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          coachId,
          clientId,
          date,
        },
      })

      return ctx.response.status(200).send({ url: session.url })
    } catch (error) {
      console.error('Error creating checkout session:', error)
      return ctx.response.status(500).send('Failed to create checkout session')
    }
  }
}
