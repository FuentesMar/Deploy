import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Order from './order.model.js';
import Product from './product.model.js'; 

const OrderProduct = sequelize.define('OrderProduct', {
    idOrderProduct: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idOrder: { type: DataTypes.INTEGER },
    idProduct: { type: DataTypes.INTEGER },
    requestedQuantity: { type: DataTypes.INTEGER }
});

// Relaciones
OrderProduct.belongsTo(Order, { foreignKey: 'idOrder' });
OrderProduct.belongsTo(Product, { foreignKey: 'idProduct' });

export default OrderProduct;
