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
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: user@example.com
 *             password: test123
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token y usuario
 *       401:
 *         description: Credenciales inválidas
 */

router.post('/login', asyncHandler(login))
/**
 * @openapi
 * /auth/users:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios registrados
 *       401:
 *         description: No autorizado
 */

router.get('/users', authMiddleware, asyncHandler(getAllUsers))

export default router