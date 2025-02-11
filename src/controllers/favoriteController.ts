import { Response } from 'express'

import { favoriteService } from '../services/favoriteService'
import { AuthenticatedRequest } from '../middlwares/auth'
import { Favorite } from '../models'

export const favoritesController = {
    index: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
    
        try {
          const favorites = await favoriteService.findByUserId(userId)
          return res.json(favorites)
        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
      },
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
        const favorited= await Favorite.findOne({
            where:{
                userId,courseId
            }
        })
        if(favorited){
            return res.status(400).json({ message: 'Você já adicionou este curso aos seus favoritos.' })
        }
      const favorite = await favoriteService.create(userId, courseId)
      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}