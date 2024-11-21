// Back-end/models/product.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
    productId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    salePrice: { type: DataTypes.DECIMAL(10, 2) },
    itemCost: { type: DataTypes.DECIMAL(10, 2) },
    stockQuantity: { type: DataTypes.INTEGER },
    imageUrl: { type: DataTypes.STRING }
}, {
    tableName: 'product',
    timestamps: false
});

export default Product;