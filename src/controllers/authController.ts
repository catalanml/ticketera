import { Request, Response } from 'express'
import { z } from 'zod'
import * as authService from '../services/authService'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
})

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4)
})

export const register = async (req: Request, res: Response) => {
  const validation = registerSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  try {
    const user = await authService.registerUser(
      validation.data.name,
      validation.data.email,
      validation.data.password
    )

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    if ((err as Error).message.includes('already exists')) {
      res.status(409).json({ error: 'El usuario ya existe' })
    } else {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export const login = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  try {
    const { token, user } = await authService.loginUser(validation.data.email, validation.data.password)

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    res.status(401).json({ error: 'Credenciales inválidas' })
  }
}

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}
