import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', protect, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Crear usuario
router.post('/', protect, adminOnly, async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, email, password: hashed, rol });
  res.status(201).json(user);
});

// Editar usuario
router.put('/:id', protect, adminOnly, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Eliminar usuario
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Usuario eliminado' });
});

export default router;