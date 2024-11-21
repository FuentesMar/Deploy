// Back-end/routes/UserRoutes.js
import express from 'express';
import { addToCart } from '../controllers/Agregar-Al-Carrito.js';

const router = express.Router();

// Ruta para obtener usuarios en /users/1/agregar/1
router.post('/:userId/agregar-al-carrito/:productId', addToCart);


export default router;