require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.disable('x-powered-by')
const port = process.env.PORT || 3000

app.use(express.json())

connectDB() // conectar a Mongo antes de arrancar el server

app.use('/', authRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
