const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middlewares/authMiddleware')

// Todas las rutas requieren JWT
router.use(authMiddleware)

router.get('/', categoryController.index)
router.post('/create', categoryController.create)
router.post('/edit', categoryController.edit)
router.post('/delete', categoryController.delete)

module.exports = router
