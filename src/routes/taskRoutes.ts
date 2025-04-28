import express from 'express';
import * as taskController from '../controllers/taskController';
import { validateRequest } from '../middlewares/validateRequest';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema } from '../validators/taskSchemas';
import { authMiddleware as protect } from '../middlewares/authMiddleware'; // Corrected import name
import { validateTaskEntities } from '../middlewares/validateEntityExists'; // Import the middleware

const router = express.Router();

// Apply auth middleware to all task routes
router.use(protect);

// POST /tasks - Create a new task
// Apply entity validation *after* schema validation but *before* controller
router.post('/',
    validateRequest(createTaskSchema),
    validateTaskEntities, // Add middleware here
    taskController.createTaskHandler
);

// GET /tasks - Get all tasks (with optional filtering)
router.get('/', taskController.getAllTasksHandler);

// GET /tasks/:id - Get a single task by ID
router.get('/:id',
    validateRequest(taskIdParamSchema),
    taskController.getTaskByIdHandler
);

// PUT /tasks/:id - Update a task by ID
// Apply entity validation *after* schema validation but *before* controller
router.put('/:id',
    validateRequest(updateTaskSchema),
    validateTaskEntities, // Add middleware here
    taskController.updateTaskHandler
);

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id',
    validateRequest(taskIdParamSchema),
    taskController.deleteTaskHandler
);

export default router;
