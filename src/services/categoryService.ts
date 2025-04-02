import Category, { ICategory } from '../models/Category'
import { Types } from 'mongoose'

export async function getAllCategories(): Promise<ICategory[]> {
  return Category.find().sort({ createdAt: -1 })
}

export async function createCategory(name: string, createdBy: string): Promise<ICategory> {
  const category = new Category({ name, createdBy: new Types.ObjectId(createdBy) })
  return category.save()
}

export async function updateCategory(id: string, updates: Partial<{ name: string, editedBy: string }>) {
  const updateData: Record<string, any> = {}

  if (updates.name) updateData.name = updates.name
  if (updates.editedBy) updateData.editedBy = new Types.ObjectId(updates.editedBy)

  return Category.findByIdAndUpdate(id, updateData)
}

export async function deleteCategory(id: string) {
  return Category.findByIdAndDelete(id)
}

