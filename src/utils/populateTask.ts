import { Query } from 'mongoose'
import { ITask } from '../models/Task'

// ✅ Para múltiples tareas
export function populateTaskList(query: Query<ITask[], ITask>) {
  return query
    .populate('category', 'name')
    .populate('assignedTo', 'name')
    .populate('priority', 'name type')
    .sort({ createdAt: -1 })
}

// ✅ Para una sola tarea (o null)
export function populateTaskOne(query: Query<ITask | null, ITask>) {
  return query
    .populate('category', 'name')
    .populate('assignedTo', 'name')
    .populate('priority', 'name type')
}
