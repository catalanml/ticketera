import Task, { ITask } from '../models/Task'
import { Types } from 'mongoose'
import { TaskStatusEnum } from '../types/enums/taskStatus.enum'
import { ICategory } from '../models/Category'
import { IUser } from '../models/User'
import { IPriority } from '../models/Priority'
import { populateTaskList, populateTaskOne } from '../utils/populateTask'

export async function getAllTasks(): Promise<ITask[]> {
    return populateTaskList(Task.find())
}

export async function getTaskById(id: string): Promise<ITask | null> {
    return populateTaskOne(Task.findById(id))
}

export async function createTask(
    name: string,
    description: string,
    category: ICategory['_id'],
    assignedTo: IUser['_id'] | null,
    priority: IPriority['_id'],
    status: TaskStatusEnum,
    dueDate: Date,
    createdBy: string
): Promise<ITask> {
    const task = new Task({
        name,
        description,
        category,
        assignedTo,
        priority,
        status,
        dueDate,
        createdBy: new Types.ObjectId(createdBy)
    })

    return task.save()
}

export async function updateTask(
    id: string,
    updates: Partial<{
        name: string
        description: string
        category: ICategory['_id']
        assignedTo: IUser['_id'] | null
        priority: IPriority['_id']
        status: TaskStatusEnum
        dueDate: Date
        editedBy: string
    }>
) {
    const updateData: Record<string, any> = {}

    if (updates.name) updateData.name = updates.name
    if (updates.description) updateData.description = updates.description
    if (updates.category) updateData.category = updates.category
    if (updates.assignedTo) updateData.assignedTo = updates.assignedTo
    if (updates.priority) updateData.priority = updates.priority
    if (updates.status) updateData.status = updates.status
    if (updates.dueDate) updateData.dueDate = updates.dueDate
    if (updates.editedBy) updateData.editedBy = new Types.ObjectId(updates.editedBy)

    return Task.findByIdAndUpdate(id, updateData, { new: true })
}

export async function deleteTask(id: string) {
    return Task.findByIdAndUpdate(
        id,
        { deleted: true, deleteAt: new Date() },
        { new: true }
    )
}

export async function completeTask(id: string, completedAt: Date, editedBy: string) {
    return Task.findByIdAndUpdate(
        id,
        { completedAt, editedBy: new Types.ObjectId(editedBy) },
        { new: true }
    )
}

export async function getTasksByUser(userId: string): Promise<ITask[]> {
    return Task.find({ assignedTo: userId })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}

export async function getTasksByStatus(status: TaskStatusEnum): Promise<ITask[]> {
    return Task.find({ status })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}

export async function getTasksByCategory(
    categoryId: string
): Promise<ITask[]> {
    return Task.find({ category: categoryId })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}

export async function getTasksByPriority(
    priorityId: string
): Promise<ITask[]> {
    return Task.find({ priority: priorityId })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}

export async function getTasksByDueDate(
    dueDate: Date
): Promise<ITask[]> {
    return Task.find({ dueDate })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}

export async function getTasksByCreatedBy(
    createdBy: string
): Promise<ITask[]> {
    return Task.find({ createdBy })
        .populate('category', 'name')
        .populate('assignedTo', 'name')
        .populate('priority', 'name type')
        .sort({ createdAt: -1 })
}
