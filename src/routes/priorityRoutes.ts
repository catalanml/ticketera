import { Router } from 'express'
import {
    createPriority,
    getAllPriorities,
    updatePriority,
    deletePriority
} from '../controllers/priorityController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.use(authMiddleware)
/**
 * @openapi
 * /priorities:
 *   get:
 *     tags:
 *       - Prioridades
 *     summary: Obtener todas las prioridades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prioridades
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', asyncHandler(getAllPriorities))
/**
 * @openapi
 * /priorities/create:
 *   post:
 *     tags:
 *       - Prioridades
 *     summary: Crear una nueva prioridad
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prioridad creada con éxito
 */
router.post('/create', asyncHandler(createPriority))

/**
 * @openapi
 * /priorities/{id}:
 *   patch:
 *     tags:
 *       - Prioridades
 *     summary: Actualizar una prioridad existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la prioridad a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                  type: number
 *     responses:
 *       200:
 *         description: Prioridad actualizada con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id', asyncHandler(updatePriority))
/**
 * @openapi
 * /priorities/{id}:
 *   delete:
 *     tags:
 *       - Prioridades
 *     summary: Eliminar una prioridad existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la prioridad a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', asyncHandler(deletePriority))


export default router
