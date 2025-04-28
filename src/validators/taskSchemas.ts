import { z } from 'zod';
import { TaskStatus } from '../enums/taskStatus.enum';

const objectIdSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: 'Invalid ID format',
});

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' })
            .min(3, 'Title must be at least 3 characters long')
            .max(100, 'Title cannot exceed 100 characters'),
        description: z.string()
            .max(1000, 'Description cannot exceed 1000 characters')
            .optional(),
        status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.OPEN),
        priority: z.enum(['Low', 'Medium', 'High'], { required_error: 'Priority is required' }),
        dueDate: z.string().datetime({ message: "Invalid datetime string! Must be UTC." }).optional(),
        category: objectIdSchema.optional(), // Optional category ID
        assignedTo: objectIdSchema.optional(), // Optional assigned user ID
        board: objectIdSchema.optional(), // Optional board ID (NEW)
        // createdBy is added automatically based on authenticated user
    }),
});

export const updateTaskSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
    body: z.object({
        title: z.string()
            .min(3, 'Title must be at least 3 characters long')
            .max(100, 'Title cannot exceed 100 characters')
            .optional(),
        description: z.string()
            .max(1000, 'Description cannot exceed 1000 characters')
            .optional()
            .nullable(), // Allow setting description to null/empty
        status: z.nativeEnum(TaskStatus).optional(),
        priority: z.enum(['Low', 'Medium', 'High']).optional(),
        dueDate: z.string().datetime({ message: "Invalid datetime string! Must be UTC." }).optional().nullable(), // Allow setting dueDate to null
        category: objectIdSchema.optional().nullable(), // Allow setting category to null
        assignedTo: objectIdSchema.optional().nullable(), // Allow setting assignedTo to null
        board: objectIdSchema.optional().nullable(), // Allow setting board to null (NEW)
    }).partial().refine(data => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    }),
});

export const taskIdParamSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body'];
