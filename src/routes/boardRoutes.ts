import express from 'express';
import * as boardController from '../controllers/boardController';
import { validateRequest } from '../middlewares/validateRequest'; // Assuming you have this middleware
import { createBoardSchema, updateBoardSchema, boardIdParamSchema } from '../validators/boardSchemas';
import { authMiddleware as protect } from '../middlewares/authMiddleware'; // Corrected import name

const router = express.Router();

// Apply auth middleware to all board routes
router.use(protect);

// POST /boards - Create a new board
router.post('/', validateRequest(createBoardSchema), boardController.createBoardHandler);

// GET /boards - Get all boards
router.get('/', boardController.getAllBoardsHandler);

// GET /boards/:id - Get a single board by ID
router.get('/:id', validateRequest(boardIdParamSchema), boardController.getBoardByIdHandler);

// PUT /boards/:id - Update a board by ID
router.put('/:id', validateRequest(updateBoardSchema), boardController.updateBoardHandler);

// DELETE /boards/:id - Delete a board by ID
router.delete('/:id', validateRequest(boardIdParamSchema), boardController.deleteBoardHandler);

export default router;
