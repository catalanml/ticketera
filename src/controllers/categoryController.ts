import { Request, Response } from 'express'
import Category from '../models/Category'
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema
} from '../validators/categorySchemas'

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const validation = createCategorySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { name } = validation.data
  const userId = req.user?.userId

  try {
    const category = await Category.create({ name, createdBy: userId })
    return res.status(201).json({
      message: 'Categoría creada con éxito',
      category: {
        id: category._id,
        name: category.name
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo crear la categoría', details: (err as Error).message })
  }
}

export const getAllCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 })
    return res.json(categories)
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener categorías' })
  }
}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  const validation = updateCategorySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id, name, editedBy } = validation.data

  try {
    await Category.findByIdAndUpdate(id, {
      name,
      editedBy: editedBy ?? req.user?.userId // si no viene, usar el del token
    })
    return res.json({ message: 'Categoría actualizada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo actualizar', details: (err as Error).message })
  }
}

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  const validation = deleteCategorySchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() })
  }

  const { id } = validation.data

  try {
    await Category.findByIdAndDelete(id)
    return res.json({ message: 'Categoría eliminada con éxito' })
  } catch (err) {
    return res.status(500).json({ error: 'No se pudo eliminar', details: (err as Error).message })
  }
}
