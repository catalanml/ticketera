import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'
import logger from './utils/logger'

dotenv.config()

const port = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(port, () => {
    logger.info(`Server is up and running at http://localhost:${port}.`);
  })
})
