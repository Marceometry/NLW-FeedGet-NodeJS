import { Router } from 'express'
import { UsersController } from '@/controllers'

const usersController = new UsersController()

export const usersRoutes = Router()

usersRoutes.post('/create', usersController.create)
