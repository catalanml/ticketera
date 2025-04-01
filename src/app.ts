import express from 'express'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import priorityRoutes from './routes/priorityRoutes'

const app = express()

app.use(express.json())
app.disable('x-powered-by')

app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/priorities', priorityRoutes)

app.get('/', (_, res) => {
    res.send('API Ticketera con TypeScript')
})

export default app
