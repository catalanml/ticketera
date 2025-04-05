import { Request, Response } from 'express'
import {
  createPrioritySchema,
  updatePrioritySchema,
  deletePrioritySchema
} from '../validators/prioritySchemas'
import * as priorityService from '../services/priorityService'

export const getAllPriorities = async (_: Request, res: Response): Promise<Response> => {
  try {
    const priorities = await priorityService.getAllPriorities()
    return res.status(200).json({
      message: 'Lista de prioridades',
      priorities
    })
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener prioridades' })
  }
}

export const createPriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = createPrioritySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { name, type } = validation.data
  const userId = req.user?.userId

  try {
    const priority = await priorityService.createPriority(name, type, userId!)
    return res.status(201).json({
      message: 'Prioridad creada con éxito',
      priority: {
        id: priority._id,
        name: priority.name,
        type: priority.type
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo crear la prioridad', details: (err as Error).message })
  }
}

export const updatePriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = updatePrioritySchema.safeParse({
    id: req.params.id,
    ...req.body
  })

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id, name, type, editedBy } = validation.data

  try {
    await priorityService.updatePriority(id, {
      name,
      type,
      editedBy: editedBy ?? req.user?.userId
    })

    return res.json({ message: 'Prioridad actualizada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo actualizar la prioridad', details: (err as Error).message })
  }
}

export const deletePriority = async (req: Request, res: Response): Promise<Response> => {
  const validation = deletePrioritySchema.safeParse({ id: req.params.id })

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id } = validation.data

  try {
    await priorityService.deletePriority(id)
    return res.json({ message: 'Prioridad eliminada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo eliminar', details: (err as Error).message })
  }
}
