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

router.get('/', asyncHandler(getAllPriorities))
router.post('/create', asyncHandler(createPriority))
router.patch('/:id', asyncHandler(updatePriority))
router.delete('/:id', asyncHandler(deletePriority))


export default router
