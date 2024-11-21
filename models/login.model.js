import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

// Definición del modelo de usuario (User)
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'User',
    timestamps: false, // Si tu tabla no tiene campos createdAt y updatedAt
});

// Método para encontrar un usuario por email
const LoginModel = {
    findByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    }
};

export default LoginModel;