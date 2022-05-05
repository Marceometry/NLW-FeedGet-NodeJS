import express from 'express'
import { router } from './routes'

const port = 3333
const app = express()

app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`)
})
