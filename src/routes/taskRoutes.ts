import { Router } from 'express'
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksByUser,
    getTasksByStatus,
    getTasksByCategory,
    getTasksByPriority,
    getTasksByDueDate,
    getTasksByCreatedBy,
} from '../controllers/taskController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validateTaskEntities } from '../middlewares/validateEntityExists'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.use(authMiddleware)

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener todas las tareas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', asyncHandler(getAllTasks))

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener una tarea por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', asyncHandler(getTaskById))

/**
 * @openapi
 * /tasks/create:
 *   post:
 *     tags:
 *       - Tareas
 *     summary: Crear una nueva tarea
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post('/create', validateTaskEntities, asyncHandler(createTask))

/**
 * @openapi
 * /tasks/{id}:
 *   patch:
 *     tags:
 *       - Tareas
 *     summary: Actualizar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.patch('/:id', validateTaskEntities, asyncHandler(updateTask))

/**
 * @openapi
 * /tasks/{id}/complete:
 *   patch:
 *     tags:
 *       - Tareas
 *     summary: Marcar una tarea como completada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - completedAt
 *               - editedBy
 *             properties:
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *               editedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea completada
 */
router.patch('/:id/complete', asyncHandler(completeTask))

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tareas
 *     summary: Eliminar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
router.delete('/:id', asyncHandler(deleteTask))

/**
 * @openapi
 * /tasks/user/{userId}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas asignadas a un usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 */
router.get('/user/:userId', asyncHandler(getTasksByUser))

/**
 * @openapi
 * /tasks/status/{status}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas por estado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [todo, in-progress, done]
 *     responses:
 *       200:
 *         description: Lista de tareas por estado
 *       400:
 *         description: Estado inválido
 */
router.get('/status/:status', asyncHandler(getTasksByStatus))

/**
 * @openapi
 * /tasks/category/{categoryId}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas por categoría
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas por categoría
 */
router.get('/category/:categoryId', asyncHandler(getTasksByCategory))

/**
 * @openapi
 * /tasks/priority/{priorityId}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas por prioridad
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: priorityId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas por prioridad
 */
router.get('/priority/:priorityId', asyncHandler(getTasksByPriority))

/**
 * @openapi
 * /tasks/due-date/{dueDate}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas por fecha de vencimiento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: dueDate
 *         in: path
 *         required: true
 *         description: Fecha en formato YYYY-MM-DD
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de tareas por fecha
 *       400:
 *         description: Fecha inválida
 */
router.get('/due-date/:dueDate', asyncHandler(getTasksByDueDate))

/**
 * @openapi
 * /tasks/created-by/{userId}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener tareas creadas por un usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas creadas por el usuario
 */
router.get('/created-by/:userId', asyncHandler(getTasksByCreatedBy))

export default router
