import express from 'express';
import * as taskController from '../controllers/taskController';
import { validateRequest } from '../middlewares/validateRequest';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema } from '../validators/taskSchemas';
import { authMiddleware as protect } from '../middlewares/authMiddleware'; // Corrected import name
import { validateTaskEntities } from '../middlewares/validateEntityExists'; // Import the middleware

const router = express.Router();

// Apply auth middleware to all task routes
router.use(protect);

/**
 * @openapi
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Invalid input or referenced entity not found (Board, Category, AssignedTo)
 *       401:
 *         description: Unauthorized
 */
// POST /tasks - Create a new task
// Apply entity validation *after* schema validation but *before* controller
router.post('/',
    validateRequest(createTaskSchema),
    validateTaskEntities, // Add middleware here
    taskController.createTaskHandler
);

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks (with optional filtering by board, category, status)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: query
 *         required: false
 *         description: Filter tasks by Board ID
 *         schema:
 *           type: string
 *       - name: categoryId
 *         in: query
 *         required: false
 *         description: Filter tasks by Category ID
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter tasks by status
 *         schema:
 *           $ref: '#/components/schemas/TaskStatus'
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: Unauthorized
 */
// GET /tasks - Get all tasks (with optional filtering)
router.get('/', taskController.getAllTasksHandler);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get a single task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
// GET /tasks/:id - Get a single task by ID
router.get('/:id',
    validateRequest(taskIdParamSchema),
    taskController.getTaskByIdHandler
);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Invalid input or referenced entity not found (Board, Category, AssignedTo)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
// PUT /tasks/:id - Update a task by ID
// Apply entity validation *after* schema validation but *before* controller
router.put('/:id',
    validateRequest(updateTaskSchema),
    validateTaskEntities, // Add middleware here
    taskController.updateTaskHandler
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id',
    validateRequest(taskIdParamSchema),
    taskController.deleteTaskHandler
);

export default router;
