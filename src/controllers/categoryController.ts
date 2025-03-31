const Category = require('../../models/Category')

exports.create = async (req, res) => {
  const { name } = req.body
  console.log('🔍 Usuario autenticado:', req.user)

  const userId = req.user?.id

  if (!name) {
    return res.status(400).json({ error: 'El nombre de la categoría es obligatorio.' })
  }

  if (!userId) {
    return res.status(401).json({ error: 'No autenticado. userId no disponible.' })
  }

  try {
    const category = new Category({ name, createdBy: userId }) // 👈 Aquí lo usamos
    await category.save()

    res.status(201).json({
      message: 'Categoría creada con éxito.',
      category: {
        id: category._id,
        name: category.name
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la categoría.', details: error.message })
  }
}

exports.index = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías.' })
  }
}

exports.edit = async (req, res) => {
  const { id, name } = req.body
  if (!id || !name) {
    return res.status(400).json({ error: 'ID y nombre son obligatorios.' })
  }

  try {
    await Category.findByIdAndUpdate(id, { name })
    res.json({ message: 'Categoría actualizada con éxito.' })
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la categoría.', details: error.message })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ error: 'ID de la categoría requerido.' })
  }

  try {
    await Category.findByIdAndDelete(id)
    res.json({ message: 'Categoría eliminada con éxito.' })
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar la categoría.', details: error.message })
  }
}
