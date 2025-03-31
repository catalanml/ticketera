import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio')
})

export const updateCategorySchema = z.object({
  id: z.string().length(24, 'ID inválido'),
  name: z.string().min(2, 'El nombre es obligatorio'),
  editedBy: z.string().length(24).optional().nullable()
})

export const deleteCategorySchema = z.object({
  id: z.string().length(24, 'ID inválido')
})
