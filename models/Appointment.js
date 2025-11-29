import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, required: true },
  hora: String,
  motivo: String,
  estado: { type: String, enum: ['pendiente', 'atendido', 'cancelado'], default: 'pendiente' }
}, { timestamps: true });

export default mongoose.model('Turno', turnoSchema);