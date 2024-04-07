import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'

import routes from './src/routes'

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', routes)

app.get('*', function (req, res) {
  res.status(404)
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
