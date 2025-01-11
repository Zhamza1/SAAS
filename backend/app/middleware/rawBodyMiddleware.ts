import { HttpContext } from '@adonisjs/core/http'

export default async function rawBodyMiddleware(ctx: HttpContext, next: () => Promise<void>) {
  if (ctx.request.url().includes('/api/payments/webhooks/stripe')) {
    const rawBody = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []
      ctx.request.request.on('data', (chunk) => chunks.push(chunk))
      ctx.request.request.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      ctx.request.request.on('error', reject)
    })

    ctx.request.updateRawBody(rawBody)
  }
  await next()
}
