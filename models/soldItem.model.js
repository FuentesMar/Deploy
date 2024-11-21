import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // O el archivo de configuración adecuado

const SoldItem = sequelize.define('SoldItem', {
    soldItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'OrderProducts',  // Nombre de la tabla de referencia
            key: 'orderProductId'    // Nombre de la columna en la tabla referenciada
        },
        //onDelete: 'CASCADE',   // Otras opciones de clave foránea
        //onUpdate: 'CASCADE'
    },
    quantitySold: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Sold_Items',
    timestamps: false
});

export default SoldItem;