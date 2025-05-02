import express from 'express';
import * as boardController from '../controllers/boardController';
import { validateRequest } from '../middlewares/validateRequest'; // Assuming you have this middleware
import { createBoardSchema, updateBoardSchema, boardIdParamSchema } from '../validators/boardSchemas';
import { authMiddleware as protect } from '../middlewares/authMiddleware'; // Corrected import name

const router = express.Router();

// Apply auth middleware to all board routes
router.use(protect);

/**
 * @openapi
 * /boards:
 *   post:
 *     tags:
 *       - Boards
 *     summary: Create a new board
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBoardInput'
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
// POST /boards - Create a new board
router.post('/', validateRequest(createBoardSchema), boardController.createBoardHandler);

/**
 * @openapi
 * /boards:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Get all boards for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardResponse'
 *       401:
 *         description: Unauthorized
 */
// GET /boards - Get all boards
router.get('/', boardController.getAllBoardsHandler);

/**
 * @openapi
 * /boards/{id}:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Get a single board by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found
 */
// GET /boards/:id - Get a single board by ID
router.get('/:id', validateRequest(boardIdParamSchema), boardController.getBoardByIdHandler);

/**
 * @openapi
 * /boards/{id}:
 *   put:
 *     tags:
 *       - Boards
 *     summary: Update a board by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBoardInput'
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found
 */
// PUT /boards/:id - Update a board by ID
router.put('/:id', validateRequest(updateBoardSchema), boardController.updateBoardHandler);

/**
 * @openapi
 * /boards/{id}:
 *   delete:
 *     tags:
 *       - Boards
 *     summary: Delete a board by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found
 */
// DELETE /boards/:id - Delete a board by ID
router.delete('/:id', validateRequest(boardIdParamSchema), boardController.deleteBoardHandler);

export default router;
