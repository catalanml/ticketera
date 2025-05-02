import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { asyncHandler } from '../utils/asyncHandler'; // Corrected import
import { FilterQuery } from 'mongoose';
import { ITask } from '../models/Task'; // Import ITask

// @desc    Create a new task
// @route   POST /tasks
// @access  Private
export const createTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    // req.user is attached by the 'protect' middleware
    const userId = req.user?.userId; // Corrected access to userId
    if (!userId) {
        // This case should ideally be prevented by the protect middleware
        // but it's good practice to check.
        // Use UnauthorizedError for consistency if you adopt custom errors widely
        return res.status(401).json({ error: 'User not authenticated' });
    }
    // Body already validated by validateRequest middleware using createTaskSchema
    // Entities (category, assignedTo, board) validated by validateTaskEntities middleware
    const task = await taskService.createTask(req.body, userId.toString());
    res.status(201).json(task);
});

// @desc    Get all tasks (with optional filtering)
// @route   GET /tasks
// @access  Private
export const getAllTasksHandler = asyncHandler(async (req: Request, res: Response) => {
    // Extract potential filters from query parameters
    const { status, priority, categoryId, assignedToId, boardId } = req.query; // Add boardId

    const filters: FilterQuery<ITask> = {};
    if (status) filters.status = status as string;
    if (priority) filters.priority = priority as string;
    if (categoryId) filters.category = categoryId as string;
    if (assignedToId) filters.assignedTo = assignedToId as string;
    if (boardId) filters.board = boardId as string; // Add board filter

    const tasks = await taskService.getAllTasks(filters);
    res.status(200).json(tasks);
});

// @desc    Get a single task by ID
// @route   GET /tasks/:id
// @access  Private
export const getTaskByIdHandler = asyncHandler(async (req: Request, res: Response) => {
    // ID validated by validateRequest middleware using taskIdParamSchema
    const task = await taskService.getTaskById(req.params.id);
    // Service throws NotFoundError if not found
    res.status(200).json(task);
});

// @desc    Update a task by ID
// @route   PUT /tasks/:id
// @access  Private
export const updateTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    // ID and Body validated by validateRequest middleware using updateTaskSchema
    // Entities (category, assignedTo, board) validated by validateTaskEntities middleware
    const task = await taskService.updateTask(req.params.id, req.body);
    // Service throws NotFoundError if not found
    res.status(200).json(task);
});

// @desc    Delete a task by ID
// @route   DELETE /tasks/:id
// @access  Private
export const deleteTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    // ID validated by validateRequest middleware using taskIdParamSchema
    await taskService.deleteTask(req.params.id);
    // Service throws NotFoundError if not found
    res.status(204).send(); // No content
});