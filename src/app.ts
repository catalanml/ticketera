import express from 'express'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import priorityRoutes from './routes/priorityRoutes'
import { errorHandler } from './middlewares/errorHandler'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger'



const app = express()

app.use(express.json())
app.disable('x-powered-by')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/priorities', priorityRoutes)

app.get('/', (_, res) => {
    res.send('API Ticketera con TypeScript')
})


app.use(errorHandler)


export default app
