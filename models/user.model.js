//Back-end/models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Cambia idUser a userId
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.ENUM('owner', 'customer'), allowNull: false }
}, {
    tableName: 'user',
    timestamps: false
});

export default User;