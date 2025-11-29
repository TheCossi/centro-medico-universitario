// server.js 
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

const defaultData = {
  pacientes: [],
  turnos: [],
  usuarios: [
    { id: 1, nombre: "Admin", rol: "admin" },
    { id: 2, nombre: "Recepcionista", rol: "recepcionista" },
    { id: 3, nombre: "Dr. Gómez", rol: "medico" }
  ]
};

await db.read();
db.data ||= defaultData;
await db.write();

// RUTAS (igual que antes)
app.get('/pacientes', async (req, res) => {
  await db.read();
  res.json(db.data.pacientes);
});

app.post('/pacientes', async (req, res) => {
  await db.read();
  const nuevo = { id: Date.now(), ...req.body };
  db.data.pacientes.push(nuevo);
  await db.write();
  res.status(201).json(nuevo);
});

app.get('/turnos', async (req, res) => {
  await db.read();
  res.json(db.data.turnos);
});

app.post('/turnos', async (req, res) => {
  await db.read();
  const nuevo = { id: Date.now(), estado: 'pendiente', ...req.body };
  db.data.turnos.push(nuevo);
  await db.write();
  res.status(201).json(nuevo);
});

app.patch('/turnos/:id', async (req, res) => {
  await db.read();
  const id = parseInt(req.params.id);
  const turno = db.data.turnos.find(t => t.id === id);
  if (turno) {
    Object.assign(turno, req.body);
    await db.write();
    res.json(turno);
  } else {
    res.status(404).json({ error: 'Turno no encontrado' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend Centro Médico Hernández Vera - ONLINE');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
