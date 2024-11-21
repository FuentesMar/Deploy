import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

// Definición del modelo de usuario (User)
const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.ENUM('owner', 'customer'), // Específico al ENUM de tu tabla
            allowNull: false,
        },
    },
    {
        tableName: 'User',
        timestamps: false, // Si tu tabla no tiene campos createdAt y updatedAt
    }
);

export default User;
