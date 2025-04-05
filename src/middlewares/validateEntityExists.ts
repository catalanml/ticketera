import { Request, Response, NextFunction } from 'express'
import Category from '../models/Category'
import User from '../models/User'
import Priority from '../models/Priority'

export async function validateTaskEntities(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { category, assignedTo, priority } = req.body

    try {
        if (category) {
            const exists = await Category.exists({ _id: category })
            if (!exists) {
                res.status(400).json({ error: 'Categoría no encontrada' })
                return
            }
        }

        if (assignedTo) {
            const exists = await User.exists({ _id: assignedTo })
            if (!exists) {
                res.status(400).json({ error: 'Usuario asignado no encontrado' })
                return
            }
        }

        if (priority) {
            const exists = await Priority.exists({ _id: priority })
            if (!exists) {
                res.status(400).json({ error: 'Prioridad no encontrada' })
                return
            }
        }

        next()
    } catch (err) {
        res.status(500).json({
            error: 'Error al validar entidades',
            details: (err as Error).message
        })
    }
}
