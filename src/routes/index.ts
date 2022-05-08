import { Router } from 'express'
import { feedbacksRoutes } from './feedbacks'
import { usersRoutes } from './users'

export const routes = Router()

routes.use('/feedbacks', feedbacksRoutes)
routes.use('/users', usersRoutes)
