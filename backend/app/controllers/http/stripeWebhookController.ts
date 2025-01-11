import { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'
import { RdvService } from '#services/rdv_service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
})

export default class StripeWebhookController {
  private rdvService: RdvService

  constructor() {
    this.rdvService = new RdvService()
  }

  public async handleWebhook(ctx: HttpContext) {
    console.log('Webhook received')

    const payload = ctx.request.raw()
    const sig = ctx.request.header('stripe-signature')

    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET as string
      )

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        const metadata = session.metadata
        if (!metadata || !metadata.coachId || !metadata.clientId || !metadata.date) {
          console.error('Missing metadata for RDV creation:', metadata)
          return ctx.response.status(400).send('Missing metadata for RDV creation')
        }

        const rdvData = {
          coachId: parseInt(metadata.coachId, 10),
          clientId: parseInt(metadata.clientId, 10),
          date: new Date(metadata.date),
        }

        const rdv = await this.rdvService.createRdv(rdvData)
        console.log('RDV created:', rdv)

        return ctx.response.status(200).send('RDV created successfully')
      }

      ctx.response.status(200).send('Webhook received')
    } catch (err) {
      console.error('Error processing webhook:', err)
      ctx.response.status(400).send('Webhook processing failed')
    }
  }
}
