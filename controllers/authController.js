const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.loginForm = (req, res) => {
  res.json({ message: 'Aquí va el formulario de login (simulado)' })
}

exports.login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  if (email === 'admin@ticketera.com' && password === '1234') {
    return res.json({ message: 'Login exitoso' })
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' })
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
