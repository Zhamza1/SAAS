import type { HttpContext } from '@adonisjs/core/http'
import { RdvService } from '#services/rdv_service'

export default class RdvsController {
  private rdvService: RdvService

  constructor() {
    this.rdvService = new RdvService()
  }

  public async index({ response }: HttpContext) {
    try {
      const rdvs = await this.rdvService.getAllRdvs()
      return response.json(rdvs)
    } catch (error) {
      return response.status(500).json({
        error: 'Erreur lors de la récupération des rendez-vous',
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

      const rdv = await this.rdvService.getRdvById(id)

      if (!rdv) {
        return response.status(404).json({
          error: 'Rendez-vous non trouvé',
        })
      }

      return response.json(rdv)
    } catch (error) {
      return response.status(500).json({
        error: "Erreur lors de la récupération du rendez-vous",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['coachId', 'clientId', 'date']); // Include 'date'

      if (!data.coachId || !data.clientId || !data.date) {
        return response.status(400).json({
          error: 'Les champs coachId, clientId et date sont requis',
        });
      }

      // Convert date string to Date object if needed
      const parsedDate = new Date(data.date);

      if (isNaN(parsedDate.getTime())) {
        return response.status(400).json({
          error: 'La date doit être valide',
        });
      }

      const rdv = await this.rdvService.createRdv({
        coachId: Number(data.coachId),
        clientId: Number(data.clientId),
        date: parsedDate, // Pass the parsed date
      });

      return response.status(201).json(rdv);
    } catch (error) {
      return response.status(400).json({
        error: "Erreur lors de la création du rendez-vous",
        details: error instanceof Error ? error.message : 'Unknown error',
      });
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

      const data = request.only(['coachId', 'clientId'])

      if (Object.keys(data).length === 0) {
        return response.status(400).json({
          error: 'Au moins un champ à mettre à jour doit être fourni',
        })
      }

      // Conversion des ID en nombres si présents
      if (data.coachId) {
        data.coachId = Number(data.coachId)
        if (isNaN(data.coachId)) {
          return response.status(400).json({
            error: 'Le coachId doit être un nombre',
          })
        }
      }

      if (data.clientId) {
        data.clientId = Number(data.clientId)
        if (isNaN(data.clientId)) {
          return response.status(400).json({
            error: 'Le clientId doit être un nombre',
          })
        }
      }

      const rdv = await this.rdvService.updateRdv(id, data)
      return response.json(rdv)
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return response.status(404).json({
          error: 'Rendez-vous non trouvé',
        })
      }

      return response.status(400).json({
        error: "Erreur lors de la mise à jour du rendez-vous",
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

      await this.rdvService.deleteRdv(id)
      return response.status(204)
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return response.status(404).json({
          error: 'Rendez-vous non trouvé',
        })
      }

      return response.status(400).json({
        error: "Erreur lors de la suppression du rendez-vous",
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async getByCoach({ params, response }: HttpContext) {
    try {
      const coachId = Number(params.coachId)

      if (isNaN(coachId)) {
        return response.status(400).json({
          error: "L'ID du coach doit être un nombre",
        })
      }

      const rdvs = await this.rdvService.getRdvsByCoachId(coachId)
      return response.json(rdvs)
    } catch (error) {
      return response.status(500).json({
        error: 'Erreur lors de la récupération des rendez-vous du coach',
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  public async getByClient({ params, response }: HttpContext) {
    try {
      const clientId = Number(params.clientId)

      if (isNaN(clientId)) {
        return response.status(400).json({
          error: "L'ID du client doit être un nombre",
        })
      }

      const rdvs = await this.rdvService.getRdvsByClientId(clientId)
      return response.json(rdvs)
    } catch (error) {
      return response.status(500).json({
        error: 'Erreur lors de la récupération des rendez-vous du client',
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}
