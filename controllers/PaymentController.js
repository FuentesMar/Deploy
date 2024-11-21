//Back-end/controllers/PaymentController.js
import { Payment } from '../models/index.model.js';  // Asegúrate de tener el modelo Payment configurado

// Crear un nuevo registro de pago
const createPayment = async (req, res) => {
  const { cartId, paymentMethod, paymentStatus } = req.body;

  try {
    const newPayment = await Payment.create({
      cartId,
      paymentMethod,
      paymentStatus,
    });

    res.status(200).json({ message: 'Pago confirmado', payment: newPayment });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ message: 'Error al confirmar el pedido' });
  }
};

export default {
  createPayment,
};