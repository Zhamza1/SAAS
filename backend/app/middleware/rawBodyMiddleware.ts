import { HttpContext } from '@adonisjs/core/http'

export default async function rawBodyMiddleware(ctx: HttpContext, next: () => Promise<void>) {
  console.log('Middleware: Checking URL for raw body middleware:', ctx.request.url())

  if (ctx.request.url().includes('/api/payments/webhooks/stripe')) {
    console.log('Middleware: Detected Stripe webhook URL')
    try {
      const rawBody = await ctx.request.raw()
      console.log('Middleware: Raw body retrieved:', rawBody)
      ctx.request.updateRawBody(rawBody)
    } catch (err) {
      console.error('Middleware: Error reading raw body:', err)
    }
  }

  await next()
}
