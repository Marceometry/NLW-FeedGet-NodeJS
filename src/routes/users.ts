import { Router } from 'express'
import { UsersController } from '@/controllers'
import { authMiddleware } from '@/middlewares'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.get('/:id', authMiddleware, usersController.getById)
usersRoutes.post('/create', usersController.create)
usersRoutes.post('/authenticate', usersController.authenticate)
