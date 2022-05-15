import { Router } from 'express'
import { UsersController } from '@/controllers'
import { authMiddleware } from '@/middlewares'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.post('/create', usersController.create)
usersRoutes.post('/authenticate', usersController.authenticate)
usersRoutes.get('/:id', authMiddleware, usersController.getById)
usersRoutes.put('/update', authMiddleware, usersController.update)
usersRoutes.delete('/delete', authMiddleware, usersController.delete)
