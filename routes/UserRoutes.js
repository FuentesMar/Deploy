// Back-end/routes/UserRoutes.js
import express from 'express';
import { addToCart, getPendingCart, removeCartProduct } from '../controllers/AgregarCarritoController.js';

const router = express.Router();

// Ruta para obtener usuarios en /users/1/agregar/1
router.post('/:userId/agregar-al-carrito/:productId', addToCart);
router.get('/:userId/cart-pending', getPendingCart); // Obtener carrito pendiente

// Ruta para eliminar un producto del carrito
router.delete('/:userId/cart/:cartProductId/remove/:productId', removeCartProduct);

export default router;