import { z } from 'zod';

export const createBoardSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Board name is required' })
            .min(3, 'Board name must be at least 3 characters long')
            .max(100, 'Board name cannot exceed 100 characters'),
        description: z.string()
            .max(500, 'Description cannot exceed 500 characters')
            .optional(),
        status: z.enum(['Open', 'In Progress', 'Closed']).optional(),
    }),
});

export const updateBoardSchema = z.object({
    params: z.object({
        id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid Board ID format',
        }),
    }),
    body: z.object({
        name: z.string()
            .min(3, 'Board name must be at least 3 characters long')
            .max(100, 'Board name cannot exceed 100 characters')
            .optional(),
        description: z.string()
            .max(500, 'Description cannot exceed 500 characters')
            .optional()
            .nullable(), // Allow setting description to null/empty
        status: z.enum(['Open', 'In Progress', 'Closed']).optional(),
    }).partial().refine(data => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    }),
});

export const boardIdParamSchema = z.object({
    params: z.object({
        id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid Board ID format',
        }),
    }),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>['body'];
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>['body'];
