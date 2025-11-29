import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import conectarDB from '../config/db.js';

dotenv.config();
conectarDB();

const seed = async () => {
  await User.deleteMany({});
  
  const salt = await bcrypt.genSalt(10);
  const hash = pass => bcrypt.hashSync(pass, salt);

  await User.create([
    { nombre: 'Admin HV', email: 'admin@hospitalhv.edu', password: hash('admin123'), rol: 'admin' },
    { nombre: 'Rosa Pérez', email: 'recepcion@hospitalhv.edu', password: hash('rec123'), rol: 'recepcionista' },
    { nombre: 'Dr. Gómez', email: 'gomez@hospitalhv.edu', password: hash('med123'), rol: 'medico' },
    { nombre: 'Dra. López', email: 'lopez@hospitalhv.edu', password: hash('med123'), rol: 'medico' }
  ]);

  console.log('Usuarios seed creados');
  process.exit();
};

seed();