require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

connectDB() // conectar a Mongo antes de arrancar el server

const app = express()
app.disable('x-powered-by')
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', authRoutes)
app.use('/categories', categoryRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
