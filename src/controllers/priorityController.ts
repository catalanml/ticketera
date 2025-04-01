import { Request, Response } from 'express'
import Priority from '../models/Priority'
import {
  createPrioritySchema,
  updatePrioritySchema,
  deletePrioritySchema
} from '../validators/prioritySchemas'

export const createPriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = createPrioritySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { name, type } = validation.data
  const userId = req.user?.userId

  try {
    const priority = await Priority.create({ name, type, createdBy: userId })
    return res.status(201).json({
      message: 'Prioridad creada con éxito',
      priority: {
        id: priority._id,
        name: priority.name
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo crear la prioridad', details: (err as Error).message })
  }
}

export const getAllPriorities = async (_: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Priority.find().sort({ createdAt: -1 })
    return res.json(categories)
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener prioridades' })
  }
}

export const updatePriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = updatePrioritySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id, name, type, editedBy } = validation.data

  try {
    await Priority.findByIdAndUpdate(id, {
      name,
      type,
      editedBy: editedBy ?? req.user?.userId // si no viene, usar el del token
    })
    return res.json({ message: 'Prioridad actualizada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo actualizar', details: (err as Error).message })
  }
}

export const deletePriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = deletePrioritySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id } = validation.data

  try {
    await Priority.findByIdAndDelete(id)
    return res.json({ message: 'Prioridad eliminada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo eliminar', details: (err as Error).message })
  }
}
