import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (_, res) => {
  res.send('API Ticketera con TypeScript')
})

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`)
  })
})
