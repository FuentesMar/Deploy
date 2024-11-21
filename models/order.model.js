import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js'; 
import OrderProduct from './orderProduct.model.js'; 

const Order = sequelize.define('Order', {
    idOrder: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: { type: DataTypes.INTEGER },
    orderDateTime: { type: DataTypes.DATE },
    saleDateTime: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
    deliveryMethod: { type: DataTypes.ENUM('Pickup', 'Home Delivery') }
});

export default Order;
