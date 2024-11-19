import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Cart from './cart.model.js'; 
import Product from './product.model.js'; 

const CartProduct = sequelize.define('CartProduct', {
    idCartProduct: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idCart: { type: DataTypes.INTEGER },
    idProduct: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER }
});

// Relaciones
CartProduct.belongsTo(Cart, { foreignKey: 'idCart' });
CartProduct.belongsTo(Product, { foreignKey: 'idProduct' });

export default CartProduct;
