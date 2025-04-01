import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio')
})

export const updateCategorySchema = z.object({
  id: z.string().length(24, 'ID inválido'),
  name: z.string().min(2).optional(),
  editedBy: z.string().length(24).optional().nullable()
}).refine(data => data.name, {
  message: 'Debes proporcionar al menos un campo para actualizar',
  path: ['name']
})


export const deleteCategorySchema = z.object({
  id: z.string().length(24, 'ID inválido')
})
