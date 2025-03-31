import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { z } from 'zod'

// 🎯 Esquemas de validación con Zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
})

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4)
})

export const register = async (req: Request, res: Response): Promise<Response> => {
  const parseResult = registerSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      issues: parseResult.error.format()
    })
  }

  const { name, email, password } = parseResult.data

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'Error al registrar usuario', details: (err as Error).message })
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const parseResult = loginSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      issues: parseResult.error.format()
    })
  }

  const { email, password } = parseResult.data

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    return res.json({
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'Error al iniciar sesión', details: (err as Error).message })
  }
}

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find({}, { password: 0 }) // Oculta el password
    return res.json(users)
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener usuarios', details: (err as Error).message })
  }
}