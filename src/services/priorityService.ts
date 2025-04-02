import Priority, { IPriority } from '../models/Priority'
import { Types } from 'mongoose'

export async function getAllPriorities(): Promise<IPriority[]> {
  return Priority.find().sort({ createdAt: -1 })
}

export async function createPriority(
  name: string,
  type: number,
  createdBy: string
): Promise<IPriority> {
  const priority = new Priority({
    name,
    type,
    createdBy: new Types.ObjectId(createdBy)
  })

  return priority.save()
}

export async function updatePriority(
  id: string,
  updates: Partial<{ name: string; type: number; editedBy: string }>
) {
  const updateData: Record<string, any> = {}

  if (updates.name) updateData.name = updates.name
  if (updates.type) updateData.type = updates.type
  if (updates.editedBy) updateData.editedBy = new Types.ObjectId(updates.editedBy)

  return Priority.findByIdAndUpdate(id, updateData)
}

export async function deletePriority(id: string) {
  return Priority.findByIdAndDelete(id)
}

