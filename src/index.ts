import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import priorityRoutes from './routes/priorityRoutes'


dotenv.config()

const app = express()
app.disable('x-powered-by')
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/priorities', priorityRoutes)

app.get('/', (_, res) => {
  res.send('API Ticketera con TypeScript')
})

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
  })
})
