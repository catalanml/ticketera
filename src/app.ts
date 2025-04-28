import express from 'express'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import taskRoutes from './routes/taskRoutes'
import { errorHandler } from './middlewares/errorHandler'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro puerto o dominio
    credentials: true, // si vas a enviar cookies o encabezados de autorización
}));

app.use(express.json())
app.disable('x-powered-by')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRoutes)
app.use('/categories', categoryRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (_, res) => {
    res.send('API Ticketera con TypeScript')
})


app.use(errorHandler)


export default app
