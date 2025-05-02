import Task, { ITask } from '../models/Task';
import { CreateTaskInput, UpdateTaskInput } from '../validators/taskSchemas';
import { NotFoundError } from '../utils/errors'; // Assuming custom errors
import { FilterQuery } from 'mongoose'; // Removed PopulateOptions as it's not directly used here
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
 * Updates an existing task by its ID using $set and $unset for clarity.
 * @param id - The ID of the task to update.
 * @param data - The data to update the task with (validated by Zod).
 * @returns The updated task document.
 * @throws NotFoundError if the task is not found.
 */
export const updateTask = async (id: string, data: UpdateTaskInput): Promise<ITask> => {
    const setOps: any = {};
    const unsetOps: any = {};

    // Iterate over validated data and prepare $set and $unset operations
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key as keyof UpdateTaskInput];

            if (value === null) {
                // Fields to unset when null is provided
                if (['dueDate', 'category', 'assignedTo', 'board'].includes(key)) {
                    unsetOps[key] = ""; // Add to $unset
                }
                // Fields to set to null explicitly when null is provided
                else if (key === 'description') {
                    setOps[key] = null; // Add to $set
                }
                // Add handling for other nullable fields if necessary
            } else if (value !== undefined) {
                // Add non-null, non-undefined values to $set
                setOps[key] = value;
            }
        }
    }

    // Construct the final update object
    const finalUpdate: any = {};
    if (Object.keys(setOps).length > 0) {
        finalUpdate.$set = setOps;
    }
    if (Object.keys(unsetOps).length > 0) {
        finalUpdate.$unset = unsetOps;
    }

    // If there are no operations, fetch and return the current task
    if (Object.keys(finalUpdate).length === 0) {
        const existingTask = await Task.findById(id).populate(populateTaskOptions);
        if (!existingTask) {
            throw new NotFoundError(`Task with ID ${id} not found`);
        }
        return existingTask;
    }

    // Perform the update operation
    const task = await Task.findByIdAndUpdate(id, finalUpdate, { new: true, runValidators: true })
        .populate(populateTaskOptions);

    // Check if the task was found and updated
    if (!task) {
        // If finalUpdate had operations but task is null, the ID was not found
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
