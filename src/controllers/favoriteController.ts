import { Response } from 'express'

import { favoriteService } from '../services/favoriteService'
import { AuthenticatedRequest } from '../middlwares/auth'

export const favoritesController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const favorite = await favoriteService.create(userId, courseId)
      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}