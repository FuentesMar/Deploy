// Back-end/controllers/CartController.js
import { Cart } from '../models/index.model.js';

// Cambiar estado del carrito a "confirmed" y crear un nuevo carrito "pending"
const createNewCart = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Cambiar el estado del carrito actual de "pending" a "confirmed"
      const cart = await Cart.findOne({ where: { userId, status: 'pending' } });
      if (!cart) {
        return res.status(404).json({ message: 'No se encontró un carrito pendiente para este usuario' });
      }
  
      await cart.update({ status: 'confirmed' });
  
      // Crear un nuevo carrito con estado "pending"
      const newCart = await Cart.create({
        userId,
        status: 'pending',
      });
  
      res.status(201).json({
        message: 'Pedido confirmado y nuevo carrito creado',
        newCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al confirmar el pedido y crear un nuevo carrito' });
    }
  };  

export default {
  createNewCart,
};