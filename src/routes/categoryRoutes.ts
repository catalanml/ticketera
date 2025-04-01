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

router.get('/', asyncHandler(getAllCategories))
router.post('/create', asyncHandler(createCategory))
router.patch('/:id', asyncHandler(updateCategory))
router.delete('/:id', asyncHandler(deleteCategory))

export default router
