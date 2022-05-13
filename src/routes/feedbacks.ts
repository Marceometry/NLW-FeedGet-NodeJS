import { Router } from 'express'
import { FeedbacksController } from '@/controllers'
import { authMiddleware } from '@/middlewares'

const feedbacksController = new FeedbacksController()

export const feedbacksRoutes = Router()

feedbacksRoutes.post('/create', feedbacksController.create)
feedbacksRoutes.get('/', authMiddleware, feedbacksController.getList)
feedbacksRoutes.delete('/delete', authMiddleware, feedbacksController.delete)
feedbacksRoutes.delete(
  '/deleteAll',
  authMiddleware,
  feedbacksController.deleteAll
)
feedbacksRoutes.delete(
  '/deleteMany',
  authMiddleware,
  feedbacksController.deleteMany
)
