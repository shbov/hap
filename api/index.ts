import dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import routes from './src/routes'

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
