import { Router } from 'express'
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.use(authMiddleware)
/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Categorías
 *     summary: Obtener todas las categorías
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', asyncHandler(getAllCategories))
/**
 * @openapi
 * /categories/create:
 *   post:
 *     tags:
 *       - Categorías
 *     summary: Crear una nueva categoría
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
 *         description: Categoría creada con éxito
 */
router.post('/create', asyncHandler(createCategory))
/**
 * @openapi
 * /categories/{id}:
 *   patch:
 *     tags:
 *       - Categorías
 *     summary: Actualizar una categoría existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría a actualizar
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
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 */
router.patch('/:id', asyncHandler(updateCategory))
/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categorías
 *     summary: Eliminar una categoría existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 */
router.delete('/:id', asyncHandler(deleteCategory))

export default router
