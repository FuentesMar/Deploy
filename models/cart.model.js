//Back-end/models/cart.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cart = sequelize.define('Cart', {
    cartId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING } // 'pending' or 'completed'
}, {
    tableName: 'cart',
    timestamps: false
});

export default Cart;
