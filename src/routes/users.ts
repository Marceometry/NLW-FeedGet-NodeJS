import { Router } from 'express'
import { UsersController } from '@/controllers'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.get('/:id', usersController.getById)
usersRoutes.post('/create', usersController.create)
usersRoutes.post('/authenticate', usersController.authenticate)
usersRoutes.post('/mail', usersController.mail)
