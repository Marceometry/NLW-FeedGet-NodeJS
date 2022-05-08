import { Router } from 'express'

export const usersRoutes = Router()

usersRoutes.post('/create', async (req, res) => {
  const { username, email } = req.body

  return res.status(201).json({ username, email })
})
