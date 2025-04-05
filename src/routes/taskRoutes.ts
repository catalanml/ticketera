import { Router } from 'express'
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    completeTask
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
 * /tasks:
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
router.post('/', validateTaskEntities, asyncHandler(createTask))

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

export default router
