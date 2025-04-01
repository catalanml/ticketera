import { z } from 'zod'

export const createPrioritySchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  type: z.number().min(1, 'El tipo es obligatorio'),
})

export const updatePrioritySchema = z.object({
  id: z.string().length(24, 'ID inválido'),
  name: z.string().min(2, 'El nombre es obligatorio'),
  type: z.number().min(1, 'El tipo es obligatorio'),
  editedBy: z.string().length(24).optional().nullable()
})

export const deletePrioritySchema = z.object({
  id: z.string().length(24, 'ID inválido')
})
