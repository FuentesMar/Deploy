import express from 'express';
import { createUser } from '../controllers/registro.controller.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/', createUser);

export default router;
