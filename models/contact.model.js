import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './user.model.js'; 

const Contact = sequelize.define('Contact', {
    idContact: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: { type: DataTypes.INTEGER },
    message: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE }
});

// Relaciones
Contact.belongsTo(User, { foreignKey: 'idUser' });

export default Contact;
