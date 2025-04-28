import { Request, Response } from 'express';
import * as boardService from '../services/boardService';
import { asyncHandler } from '../utils/asyncHandler'; // Corrected import

// @desc    Create a new board
// @route   POST /boards
// @access  Private (add auth middleware later)
export const createBoardHandler = asyncHandler(async (req: Request, res: Response) => {
    const board = await boardService.createBoard(req.body);
    res.status(201).json(board);
});

// @desc    Get all boards
// @route   GET /boards
// @access  Private (add auth middleware later)
export const getAllBoardsHandler = asyncHandler(async (_req: Request, res: Response) => {
    const boards = await boardService.getAllBoards();
    res.status(200).json(boards);
});

// @desc    Get a single board by ID
// @route   GET /boards/:id
// @access  Private (add auth middleware later)
export const getBoardByIdHandler = asyncHandler(async (req: Request, res: Response) => {
    const board = await boardService.getBoardById(req.params.id);
    // Service throws NotFoundError if not found, caught by asyncHandler/errorHandler
    res.status(200).json(board);
});

// @desc    Update a board by ID
// @route   PUT /boards/:id
// @access  Private (add auth middleware later)
export const updateBoardHandler = asyncHandler(async (req: Request, res: Response) => {
    const board = await boardService.updateBoard(req.params.id, req.body);
    // Service throws NotFoundError if not found, caught by asyncHandler/errorHandler
    res.status(200).json(board);
});

// @desc    Delete a board by ID
// @route   DELETE /boards/:id
// @access  Private (add auth middleware later)
export const deleteBoardHandler = asyncHandler(async (req: Request, res: Response) => {
    await boardService.deleteBoard(req.params.id);
    // Service throws NotFoundError if not found, caught by asyncHandler/errorHandler
    res.status(204).send(); // No content on successful deletion
});
