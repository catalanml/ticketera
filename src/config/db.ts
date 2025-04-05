import mongoose from 'mongoose'
import logger from '../utils/logger'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    logger.info('🟢 Successfully connected to MongoDB')
  } catch (err) {
    logger.error('🔴 Error connecting to MongoDB:', (err as Error).message)
    process.exit(1)
  }
}

export default connectDB
