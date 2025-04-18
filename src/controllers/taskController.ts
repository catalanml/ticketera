import { Request, Response } from 'express'
import {
    createTaskSchema,
    updateTaskSchema,
    completeTaskSchema
} from '../validators/taskSchemas'
import * as taskService from '../services/taskService'
import { TaskStatusEnum } from '../enums/taskStatus.enum'

export const getAllTasks = async (_: Request, res: Response) => {
    const tasks = await taskService.getAllTasks()
    return res.status(200).json({ message: 'Lista de tareas', tasks })
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params
    const task = await taskService.getTaskById(id)
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    return res.status(200).json({ message: 'Tarea encontrada', task })
}

export const createTask = async (req: Request, res: Response) => {
    const parseResult = createTaskSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: 'Datos inválidos', issues: parseResult.error.format() })
    }

    const { name, description, category, assignedTo, priority, status, dueDate } = parseResult.data
    const createdBy = req.user?.userId

    if (!createdBy) return res.status(401).json({ error: 'Usuario no autenticado' })

    const task = await taskService.createTask(
        name,
        description,
        category,
        assignedTo,
        priority,
        status,
        dueDate,
        createdBy
    )

    return res.status(201).json({
        message: 'Tarea creada con éxito',
        task
    })
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params

    const parseResult = updateTaskSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: 'Datos inválidos', issues: parseResult.error.format() })
    }

    const task = await taskService.getTaskById(id)
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    const updated = await taskService.updateTask(id, {
        ...parseResult.data,
        editedBy: parseResult.data.editedBy ?? req.user?.userId
    })

    return res.json(updated)
}

export const completeTask = async (req: Request, res: Response) => {
    const { id } = req.params

    const parseResult = completeTaskSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: 'Datos inválidos', issues: parseResult.error.format() })
    }

    const task = await taskService.getTaskById(id)
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    if (task.completedAt) return res.status(400).json({ error: 'La tarea ya está completada' })

    const updated = await taskService.completeTask(id, parseResult.data.completedAt, parseResult.data.editedBy)
    return res.json(updated)
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    const task = await taskService.getTaskById(id)
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })

    await taskService.deleteTask(id)
    return res.json({ message: 'Tarea eliminada exitosamente' })
}


export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    const tasks = await taskService.getTasksByUser(userId)
    res.status(200).json({ message: 'Lista de tareas por prioridad', tasks })
}

export const getTasksByStatus = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.params

    if (!Object.values(TaskStatusEnum).includes(status as TaskStatusEnum)) {
        res.status(400).json({ error: 'Estado inválido' })
        return
    }

    const tasks = await taskService.getTasksByStatus(status as TaskStatusEnum)
    res.status(200).json(tasks)
}

export const getTasksByCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params
    const tasks = await taskService.getTasksByCategory(categoryId)
    res.status(200).json(tasks)
}

export const getTasksByPriority = async (req: Request, res: Response): Promise<void> => {
    const { priorityId } = req.params
    const tasks = await taskService.getTasksByPriority(priorityId)
    res.status(200).json(tasks)
}

export const getTasksByDueDate = async (req: Request, res: Response): Promise<void> => {
    const { dueDate } = req.params

    const parsedDate = new Date(dueDate)
    if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ error: 'Fecha inválida' })
        return
    }

    const tasks = await taskService.getTasksByDueDate(parsedDate)
    res.status(200).json(tasks)
}

export const getTasksByCreatedBy = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    const tasks = await taskService.getTasksByCreatedBy(userId)
    res.status(200).json(tasks)
}