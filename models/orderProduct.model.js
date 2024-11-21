import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // O el archivo de configuración adecuado

const OrderProduct = sequelize.define('OrderProduct', {
    orderProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'OrderProducts',
    timestamps: false
});

export default OrderProduct;