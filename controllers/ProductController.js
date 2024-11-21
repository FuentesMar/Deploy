// Back-end/controllers/ProductController.js
import { Op } from 'sequelize';
import { Product } from '../models/index.model.js';

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por su ID (nueva función)
const getProductByID = async (req, res) => {
  const { productId } = req.params;  // Obtenemos el productId de los parámetros de la URL
  //console.log('Petición recibida para /getproductbyid:', req.params.productId);
  try {
    const product = await Product.findByPk(productId);  // Buscamos el producto por su ID
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });  // Si no se encuentra, enviamos un 404
    }
    res.status(200).json(product);  // Si se encuentra el producto, lo enviamos en la respuesta
  } catch (error) {
    console.error('Error al obtener el producto:', error);  // Log para debugging
    res.status(500).json({ message: 'Error al obtener el producto' });  // Error genérico del servidor
  }
};

// Obtener productos por nombre
const getProductByName = async (req, res) => {
  const { name } = req.query;
  try {
      const products = await Product.findAll({
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

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, description, category, salePrice, itemCost, stockQuantity, imageUrl } = req.body;
  const newProduct = { name, description, category, salePrice, itemCost, stockQuantity, imageUrl };

  try {
    const product = await Product.create(newProduct);
    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto' });
  }
};

// Actualizar un producto por su ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, salePrice, itemCost, stockQuantity, imageUrl } = req.body;
  const updatedProduct = { name, description, category, salePrice, itemCost, stockQuantity, imageUrl };

  try {
    const [updatedRows] = await Product.update(updatedProduct, { where: { productId: id } });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por su ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Product.destroy({ where: { productId: id } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

// Filtrar productos por categoría
// Filtrar y ordenar productos por categoría y precio
const productsFilteredAndSorted = async (req, res) => {
  const { category, sortOrder } = req.query;  // Obtener la categoría y el orden de clasificación de la consulta

  try {
    const products = await Product.findAll({
      where: {
        category: {
          [Op.like]: `%${category}%`,  // Búsqueda parcial y flexible en categoría
        },
      },
      order: sortOrder ? [['salePrice', sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC']] : undefined,  // Ordenar si se especifica sortOrder
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error en filterProductsByCategory:', error);
    res.status(500).json({ message: 'Error al filtrar y ordenar productos' });
  }
};

export default {
  getProducts,
  getProductByName,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  productsFilteredAndSorted,
};