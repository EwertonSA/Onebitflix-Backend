import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseController'
import { episodesController } from './controllers/episodeController'
import { authController } from './controllers/authController'
import { ensureauth, ensureAuthViaQuery } from './middlwares/auth'
import { favoritesController } from './controllers/favoriteController'

export const router = express.Router()
router.post('/auth/login', authController.login)
router.post('/auth/register',authController.register)

router.get('/categories',ensureauth ,categoriesController.index)
router.get('/categories/:id',ensureauth ,categoriesController.show)

router.get('/courses/featured',ensureauth ,coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search',ensureauth ,coursesController.search)
router.get('/courses/:id', ensureauth,coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/favorites', ensureauth, favoritesController.index)
router.post('/favorites',ensureauth, favoritesController.save)
router.delete('/favorites/:id',ensureauth,favoritesController.delete)
