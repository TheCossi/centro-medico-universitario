// server.js 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/centromedico";

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error MongoDB:', err));

// Modelos
const pacienteSchema = new mongoose.Schema({
  nombre: String,
  dni: String,
  telefono: String,
  obraSocial: String
}, { timestamps: true });

const turnoSchema = new mongoose.Schema({
  paciente: String,
  medico: String,
  fecha: String,
  hora: String,
  motivo: String,
  estado: { type: String, default: 'pendiente' }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
const Turno = mongoose.model('Turno', turnoSchema);

// Rutas
app.get('/', (req, res) => {
  res.send('Backend Centro Médico Hernández Vera - ONLINE');
});

app.get('/pacientes', async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
});

app.post('/pacientes', async (req, res) => {
  const paciente = new Paciente(req.body);
  await paciente.save();
  res.status(201).json(paciente);
});

app.get('/turnos', async (req, res) => {
  const turnos = await Turno.find().sort({ fecha: 1, hora: 1 });
  res.json(turnos);
});

app.post('/turnos', async (req, res) => {
  const turno = new Turno(req.body);
  await turno.save();
  res.status(201).json(turno);
});

app.patch('/turnos/:id', async (req, res) => {
  const turno = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(turno);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

