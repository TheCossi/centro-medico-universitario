import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import pacientesRoutes from './routes/pacientes.js';
import turnosRoutes from './routes/turnos.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-proyecto.vercel.app']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/turnos', turnosRoutes);

app.get('/', (req, res) => res.send('API Hospital Hernández Vera - ONLINE'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Backend corriendo!')))
  .catch(err => console.log(err));