import { Router } from 'express'
import { FeedbacksController } from '@/controllers'

const feedbacksController = new FeedbacksController()

export const feedbacksRoutes = Router()

feedbacksRoutes.post('/create', feedbacksController.create)
feedbacksRoutes.get('/', feedbacksController.getList)
