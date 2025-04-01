import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

dotenv.config()

const port = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})
