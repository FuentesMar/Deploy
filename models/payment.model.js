import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Cart from './cart.model.js'; 

const Payment = sequelize.define('Payment', {
    paymentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cartId: { type: DataTypes.INTEGER },
    paymentMethod: { type: DataTypes.ENUM('PayPal', 'Bank Transfer') },
    paymentStatus: { type: DataTypes.STRING } // 'pending', 'completed', etc.
}, {
    tableName: 'payment',
    timestamps: false
});

export default Payment;
