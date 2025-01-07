import type { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'

export default class UsersController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async index({ response }: HttpContext) {
    try {
      const users = await this.userService.getAllUsers()
      return response.json(users)
    } catch (error) {
      return response.status(500).json({
        error: 'Erreur lors de la récupération des utilisateurs',
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const id = Number(params.id)

      if (isNaN(id)) {
        return response.status(400).json({
          error: "L'ID doit être un nombre",
        })
      }

      const user = await this.userService.getUserById(id)

      if (!user) {
        return response.status(404).json({
          error: 'Utilisateur non trouvé',
        })
      }

      return response.json(user)
    } catch (error) {
      return response.status(500).json({
        error: "Erreur lors de la récupération de l'utilisateur",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'name', 'password', 'firstname', 'role'])

      if (!data.email || !data.name || !data.password || !data.firstname) {
        return response.status(400).json({
          error: 'Les champs email, name et password sont requis',
        })
      }

      const user = await this.userService.createUser(data)
      return response.status(201).json(user)
    } catch (error) {
      if (error instanceof Error && error.message.includes('unique constraint')) {
        return response.status(400).json({
          error: 'Un utilisateur avec cet email existe déjà',
        })
      }

      return response.status(400).json({
        error: "Erreur lors de la création de l'utilisateur",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const id = Number(params.id)

      if (isNaN(id)) {
        return response.status(400).json({
          error: "L'ID doit être un nombre",
        })
      }

      const data = request.only(['email', 'name', 'password', 'firstname'])

      if (Object.keys(data).length === 0) {
        return response.status(400).json({
          error: 'Au moins un champ à mettre à jour doit être fourni',
        })
      }

      const user = await this.userService.updateUser(id, data)
      return response.json(user)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Record to update not found')) {
          return response.status(404).json({
            error: 'Utilisateur non trouvé',
          })
        }
        if (error.message.includes('unique constraint')) {
          return response.status(400).json({
            error: 'Un utilisateur avec cet email existe déjà',
          })
        }
      }

      return response.status(400).json({
        error: "Erreur lors de la mise à jour de l'utilisateur",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const id = Number(params.id)

      if (isNaN(id)) {
        return response.status(400).json({
          error: "L'ID doit être un nombre",
        })
      }

      await this.userService.deleteUser(id)
      return response.status(204)
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return response.status(404).json({
          error: 'Utilisateur non trouvé',
        })
      }

      return response.status(400).json({
        error: "Erreur lors de la suppression de l'utilisateur",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}
