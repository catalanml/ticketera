const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.loginForm = (req, res) => {
  res.json({ message: 'Aquí va el formulario de login (simulado)' })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Login exitoso
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error al iniciar sesión:', error) // Log the error internally
    res.status(500).json({ error: 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.' })
  }
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está registrado' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password') // Excluye la contraseña
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message })
  }
}
