import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('🟢 Conectado a MongoDB')
  } catch (err) {
    console.error('🔴 Error conectando a MongoDB:', (err as Error).message)
    process.exit(1)
  }
}

export default connectDB
