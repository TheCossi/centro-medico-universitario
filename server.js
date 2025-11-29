const express = require('express');
const cors = require('cors');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos con lowdb (se guarda en db.json)
const dbPath = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

// Datos iniciales (se crean si no existe el archivo)
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

// === RUTAS PACIENTES ===
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

// === RUTAS TURNOS ===
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

// === RUTA DE PRUEBA ===
app.get('/', (req, res) => {
  res.send('Backend del Centro Médico Universitario - FUNCIONANDO');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});