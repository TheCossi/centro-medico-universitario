import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'medico', 'recepcionista'], default: 'recepcionista' },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);