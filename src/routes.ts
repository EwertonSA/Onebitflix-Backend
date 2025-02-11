import express from 'express'
import { categoriesController } from './controllers/categoriesController'
import { coursesController } from './controllers/courseController'
import { episodesController } from './controllers/episodeController'
import { authController } from './controllers/authController'
import { ensureauth, ensureAuthViaQuery } from './middlwares/auth'
import { favoritesController } from './controllers/favoriteController'
import { likesController } from './controllers/likesController'
import { userController } from './controllers/userController'

export const router = express.Router()
router.post('/auth/login', authController.login)
router.post('/auth/register',authController.register)

router.get('/categories',ensureauth ,categoriesController.index)
router.get('/categories/:id',ensureauth ,categoriesController.show)

router.get('/courses/featured',ensureauth ,coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search',ensureauth ,coursesController.search)
router.get('/courses/popular',ensureauth, coursesController.topTen)
router.get('/courses/:id', ensureauth,coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)
router.get('/episodes/:id/watchTime',ensureauth, episodesController.getWatch)
router.post('/episodes/:id/watchTime',ensureauth, episodesController.setWatch)

router.get('/favorites', ensureauth, favoritesController.index)
router.post('/favorites',ensureauth, favoritesController.save)
router.delete('/favorites/:id',ensureauth,favoritesController.delete)

router.post('/likes',ensureauth, likesController.save)
router.delete('/likes/:id',ensureauth, likesController.delete)

router.get('/users/current', ensureauth, userController.show)
router.get("/users/current/watching", ensureauth, userController.watching)