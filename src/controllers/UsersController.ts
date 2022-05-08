import { Request, Response } from 'express'

export class UsersController {
  public create = async (req: Request, res: Response) => {
    const data = req.body

    return res.status(201).json(data)
  }
}
