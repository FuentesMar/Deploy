//Back-end/models/cartProduct.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CartProduct = sequelize.define('CartProduct', {
    cartProductId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cartId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER }
}, {
    tableName: 'cart_product',
    timestamps: false
});

export default CartProduct;
