import Task, { ITask } from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../validators/taskSchemas';
import { NotFoundError } from '../utils/errors'; // Assuming custom errors
import { FilterQuery, PopulateOptions } from 'mongoose';
import { populateTaskOptions } from '../utils/populateTask'; // Import populate options

/**
 * Creates a new task.
 * @param data - Data for the new task.
 * @param userId - The ID of the user creating the task.
 * @returns The newly created task document.
 */
export const createTask = async (data: CreateTaskInput, userId: string): Promise<ITask> => {
    // Add createdBy and potentially boardId from data
    const taskData = { ...data, createdBy: userId };
    const task = new Task(taskData);
    await task.save();
    // Populate references before returning
    return await task.populate(populateTaskOptions) as ITask;
};

/**
 * Retrieves all tasks, optionally filtering by status, priority, category, assigned user, or board.
 * @param filters - Optional query parameters for filtering.
 * @returns A list of task documents.
 */
export const getAllTasks = async (filters: FilterQuery<ITask> = {}): Promise<ITask[]> => {
    // Remove undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
    // Add board filter if present
    // Example: if (filters.boardId) { queryFilters.board = filters.boardId; delete filters.boardId; }

    return await Task.find(filters)
        .populate(populateTaskOptions) // Use shared populate options
        .sort({ createdAt: -1 }); // Sort by creation date, newest first
};


/**
 * Retrieves a single task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns The task document or null if not found.
 * @throws NotFoundError if the task is not found.
 */
export const getTaskById = async (id: string): Promise<ITask> => {
    const task = await Task.findById(id).populate(populateTaskOptions); // Populate references
    if (!task) {
        throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
};

/**
 * Updates an existing task by its ID.
 * @param id - The ID of the task to update.
 * @param data - The data to update the task with.
 * @returns The updated task document or null if not found.
 * @throws NotFoundError if the task is not found.
 */
export const updateTask = async (id: string, data: UpdateTaskInput): Promise<ITask> => {
    // Handle setting fields to null explicitly if needed in data
    const updateData = { ...data };
    if (data.description === null) updateData.description = null; // Preserve explicit null to clear the field
    if (data.dueDate === null) updateData.dueDate = undefined;
    if (data.category === null) updateData.category = undefined;
    if (data.assignedTo === null) updateData.assignedTo = undefined;
    if (data.board === null) updateData.board = undefined; // Handle board update

    const task = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .populate(populateTaskOptions); // Populate after update
    if (!task) {
        throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns The deleted task document or null if not found.
 * @throws NotFoundError if the task is not found.
 */
export const deleteTask = async (id: string): Promise<ITask> => {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
};
