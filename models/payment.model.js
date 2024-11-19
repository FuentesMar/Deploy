import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Cart from './cart.model.js'; 

const Payment = sequelize.define('Payment', {
    idPayment: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idCart: { type: DataTypes.INTEGER },
    paymentMethod: { type: DataTypes.ENUM('PayPal', 'Bank Transfer') },
    paymentStatus: { type: DataTypes.STRING } // 'pending', 'completed', etc.
});

// Relaciones
Payment.belongsTo(Cart, { foreignKey: 'idCart' });

export default Payment;
