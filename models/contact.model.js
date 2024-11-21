import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js'; 

const Contact = sequelize.define('Contact', {
    idContact: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idUser: { type: DataTypes.INTEGER },
    message: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE }
});

export default Contact;
