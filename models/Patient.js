import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  telefono: String,
  fechaNacimiento: Date,
  obraSocial: String,
  numeroAfiliado: String,
  direccion: String
}, { timestamps: true });

export default mongoose.model('Paciente', pacienteSchema);