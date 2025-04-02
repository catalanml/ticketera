import { Router } from 'express'
import { login, register, getAllUsers } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       409:
 *         description: El correo ya está registrado
 */
router.post('/register', asyncHandler(register))

router.post('/login', asyncHandler(login))
router.get('/users', authMiddleware, asyncHandler(getAllUsers))

export default router