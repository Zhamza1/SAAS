import { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const stripe = new Stripe(
  'sk_test_51PIDv1GO9b6wjgsNthfXJ2CzOpOTmtlrzhuIYCjl3Cp1CSIZiI3XcZK2FCv7uKvx4YsznICoPWQwjWTz9XLUAK6E00N15Esphb',
  {
    apiVersion: '2024-04-10',
  }
)

export default class PaymentController {
  async createCheckoutSession(ctx: HttpContext) {
    const { amount, successUrl, cancelUrl, userId } = ctx.request.only([
      'amount',
      'successUrl',
      'cancelUrl',
      'userId',
    ])

    console.log('result')
    if (!amount || amount <= 0) {
      return ctx.response.status(400).json({ error: 'Invalid amount' })
    }
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Coach Appointment',
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { userId },
      })

      return ctx.response.status(200).json({ url: session.url })
    } catch (error) {
      console.error(error)
      return ctx.response.status(500).json({ error: 'Failed to create session' })
    }
  }

  async handleWebhook(ctx: HttpContext) {
    const signature = ctx.request.header('stripe-signature')
    const payload = ctx.request.raw()

    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        'rk_test_51PIDv1GO9b6wjgsNT5mMm1VhtB9tpgDALIFNITTaXBeCdEPS6M1a0mKENH26kRG7IfQKmNgcbkh29YOmonbY1FBl00frGvkdeJ'
      )

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        // Record payment in your database
        await PrismaClient.payment.create({
          data: {
            stripeId: session.id,
            userId: parseInt(session.metadata?.userId || '0'),
            amount: session.amount_total! / 100,
            status: 'completed',
          },
        })
      }

      return ctx.response.status(200).json({ received: true })
    } catch (error) {
      console.error(error)
      return ctx.response.status(400).json({ error: 'Webhook Error' })
    }
  }
}
