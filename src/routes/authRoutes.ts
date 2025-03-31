import { Router } from 'express'
import { login, register, getAllUsers } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.post('/login', asyncHandler(login))
router.post('/register', asyncHandler(register))
router.get('/users', authMiddleware, asyncHandler(getAllUsers))

export default router