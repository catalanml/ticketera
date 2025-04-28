import { z } from 'zod'
import { TaskStatusEnum } from '../enums/taskStatus.enum'

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB inválido')

export const createTaskSchema = z.object({
    name: z.string().min(3, 'El nombre es obligatorio'),
    description: z.string().min(5, 'La descripción es obligatoria'),
    category: objectId,
    assignedTo: objectId,
    priority: z.number().int().min(1).max(3, 'La prioridad debe ser 1, 2 o 3'),
    status: z.nativeEnum(TaskStatusEnum).default(TaskStatusEnum.TODO),
    dueDate: z.coerce.date().refine(date => date > new Date(), {
        message: 'La fecha de vencimiento debe ser futura'
    })
})

export const updateTaskSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(5).optional(),
    category: objectId.optional(),
    assignedTo: objectId.optional(),
    priority: z.number().int().min(1).max(3, 'La prioridad debe ser 1, 2 o 3').optional(),
    status: z.nativeEnum(TaskStatusEnum).optional(),
    dueDate: z.coerce.date().refine(date => date > new Date(), {
        message: 'La fecha de vencimiento debe ser futura'
    }).optional(),
    editedBy: objectId.optional()
})

export const completeTaskSchema = z.object({
    completedAt: z.coerce.date(),
    editedBy: objectId
})

export const deleteTaskSchema = z.object({
    id: objectId
})

export const deleteCategorySchema = z.object({
    id: objectId
})
