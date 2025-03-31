import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

// 3. Exportar el modelo
const User = model<IUser>('User', userSchema)
export default User
