import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

export async function registerUser(name: string, email: string, password: string): Promise<IUser> {
  const existing = await User.findOne({ email })
  if (existing) throw new Error('El email ya está registrado')

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashedPassword })
  return user.save()
}

export async function loginUser(email: string, password: string): Promise<{ token: string, user: IUser }> {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Usuario no encontrado')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Contraseña incorrecta')

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  )

  return { token, user }
}

export async function getAllUsers() {
  return User.find({}, { password: 0 })
}

