// Back-end/controllers/UserController.js
import { Op } from 'sequelize';
import { User }  from '../models/index.model.js';

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await User.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por su ID (nueva función)
const getUserByID = async (req, res) => {
    const { userId } = req.params; 
    try {
      const product = await User.findByPk(userId); 
      if (!product) {
        return res.status(404).json({ message: 'Usuario no encontrado' });  // Si no se encuentra, enviamos un 404
      }
      res.status(200).json(product);  
    } catch (error) {
      console.error('Error al obtener el usuario:', error);  // Log para debugging
      res.status(500).json({ message: 'Error al obtener el usuario' });  // Error genérico del servidor
    }
  };

// Obtener productos por nombre
const getUserByName = async (req, res) => {
  const { name } = req.query;
  try {
      const products = await User.findAll({
          where: {
              name: {
                  [Op.like]: `%${name}%`, // Cambiado para compatibilidad con otras bases de datos
              },
          },
      });
      if (products.length === 0) {
          return res.status(404).json({ message: 'No se encontraron productos con ese nombre' });
      }
      res.status(200).json(products);
  } catch (error) {
      console.error('Error en getProductByName:', error); // Log del error
      res.status(500).json({ message: 'Error al buscar productos' });
  }
};

export default {
  getProducts,
  getUserByID,
  getUserByName,
};