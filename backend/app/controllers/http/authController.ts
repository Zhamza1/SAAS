import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#services/authService'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async register(ctx: HttpContext) {
    try {
      const data = ctx.request.only(['email', 'password', 'name', 'firstname', 'role'])

      // Rôle "client" par défaut
      const registrationData = {
        ...data,
        role: data.role || 'client',
      }

      if (!this.validateRegistrationData(data)) {
        return ctx.response.status(400).json({
          error: 'Tous les champs sont requis',
        })
      }

      const result = await this.authService.register(registrationData)
      return ctx.response.status(201).json(result)
    } catch (error) {
      if (error instanceof Error && error.message.includes('unique constraint')) {
        return ctx.response.status(400).json({
          error: 'Cet email est déjà utilisé',
        })
      }

      return ctx.response.status(400).json({
        error: "Erreur lors de l'inscription",
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      })
    }
  }

  public async login(ctx: HttpContext) {
    try {
      const { email, password } = ctx.request.only(['email', 'password'])

      if (!email || !password) {
        return ctx.response.status(400).json({
          error: 'Email et mot de passe requis',
        })
      }

      const result = await this.authService.login(email, password)
      const { token, user } = result

      ctx.response.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // Pour les connexions HTTPS only en prod
        sameSite: 'strict',
      })

      return ctx.response.json({
        message: 'Connexion réussie',
        user,
      })
    } catch (error) {
      return ctx.response.status(401).json({
        error: 'Identifiants incorrects',
      })
    }
  }

  public async logout(ctx: HttpContext) {
    return ctx.response.status(200).json({
      message: 'Déconnexion réussie',
    })
  }

  private validateRegistrationData(data: any): boolean {
    return !!(data.email && data.password && data.name && data.firstname)
  }
}
