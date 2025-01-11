import { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'

const stripe = new Stripe(
  'sk_test_51PIDv1GO9b6wjgsNthfXJ2CzOpOTmtlrzhuIYCjl3Cp1CSIZiI3XcZK2FCv7uKvx4YsznICoPWQwjWTz9XLUAK6E00N15Esphb',
  {
    apiVersion: '2024-04-10',
  }
)

export default class StripeWebhookController {
  async handleWebhook(ctx: HttpContext) {
    try {
      const signature = ctx.request.header('stripe-signature')
      const rawBody = ctx.request.raw()

      if (!rawBody || !signature) {
        console.error('Invalid payload or missing signature')
        return ctx.response.status(400).send('Invalid payload or missing signature')
      }

      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        'rk_test_51PIDv1GO9b6wjgsNT5mMm1VhtB9tpgDALIFNITTaXBeCdEPS6M1a0mKENH26kRG7IfQKmNgcbkh29YOmonbY1FBl00frGvkdeJ'
      )

      console.log('Event type:', event.type)

      // Répondre immédiatement
      ctx.response.status(200).send('Webhook received')

      // Traitez l'événement en arrière-plan si nécessaire
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Session ID:', session.id)
        // Simulez un traitement long ici
      }
    } catch (err) {
      console.error('Webhook error:', err)
      ctx.response.status(400).send('Webhook error')
    }
  }
}
