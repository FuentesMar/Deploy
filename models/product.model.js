// productModel.js

import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('Product', {
  idProduct: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  salePrice: { type: DataTypes.DECIMAL(10, 2) },
  itemCost: { type: DataTypes.DECIMAL(10, 2) },
  stockQuantity: { type: DataTypes.INTEGER },
  image: { type: DataTypes.STRING }
});

// Funciones CRUD
export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const updateProductInDb = async (id, updatedProduct) => {
  try {
    // Verifica que la columna en la base de datos sea 'idProduct', o usa 'id' si es necesario.
    const [updatedRows] = await Product.update(updatedProduct, { where: { idProduct: id } });

    if (updatedRows === 0) return null; // Si no se actualizó ningún producto

    // Obtener y retornar el producto actualizado
    return await getProductById(id); // Asegúrate de que esta función esté bien implementada
  } catch (error) {
    console.error('Error al actualizar el producto:', error); // Agregar un log para facilitar la depuración
    throw error; // Lanza el error para ser manejado por el controlador
  }
};


export const deleteProductInDb = async (id) => { // Cambié el nombre a deleteProductInDb
  try {
    const deletedProduct = await Product.destroy({ where: { idProduct: id } });
    return deletedProduct > 0;
  } catch (error) {
    throw error;
  }
};