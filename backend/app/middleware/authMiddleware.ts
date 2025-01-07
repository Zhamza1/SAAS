import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { JwtService } from '#services/jwtService'

interface AuthenticatedData {
  userId: number
  email: string
  name: string
  firstname: string
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    auth: {
      user: AuthenticatedData | null
    }
  }
}

export default class AuthMiddleware {
  private jwtService: JwtService

  constructor() {
    this.jwtService = new JwtService()
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie('authToken')

    if (!token) {
      return ctx.response.status(401).json({
        error: 'Token manquant ou invalide',
      })
    }

    try {
      const decoded = this.jwtService.verifyToken(token)

      ctx.auth = { user: decoded }

      await next()
    } catch (error) {
      return ctx.response.status(401).json({
        error: 'Token invalide ou expiré',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      })
    }
  }
}
