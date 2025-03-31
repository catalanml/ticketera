const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/login', authController.loginForm)
router.get('/users', authMiddleware, authController.getAllUsers)
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router
