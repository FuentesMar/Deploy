import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './user.model.js'; 
import Product from './product.model.js'; 

const Review = sequelize.define('Review', {
    idReview: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idProduct: { type: DataTypes.INTEGER },
    idUser: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE }
});

// Relaciones
Review.belongsTo(User, { foreignKey: 'idUser' });
Review.belongsTo(Product, { foreignKey: 'idProduct' });

export default Review;
