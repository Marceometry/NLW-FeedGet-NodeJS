import { Router } from 'express'
import { NodemailerMailAdapter } from './adapters'
import { PrismaFeedbacksRepository } from './repositories'
import { SubmitFeedbackUseCase } from './usecases'

export const routes = Router()

routes.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  const { id } = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).json({ id })
})
