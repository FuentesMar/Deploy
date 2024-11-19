import { getAllProducts, getProductById, addProduct, updateProductInDb, deleteProductInDb } from '../models/product.model.js'; // Renombrado updateProduct a updateProductInDb

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// Obtener un producto por su ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, description, category, salePrice, itemCost, stockQuantity, image } = req.body;
  const newProduct = { name, description, category, salePrice, itemCost, stockQuantity, image };

  try {
    const product = await addProduct(newProduct);
    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto' });
  }
};

// Actualizar un producto por su ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, salePrice, itemCost, stockQuantity, image } = req.body;
  const updatedProduct = { name, description, category, salePrice, itemCost, stockQuantity, image };

  try {
    const product = await updateProductInDb(id, updatedProduct); // Cambié a updateProductInDb
    if (!product) {
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
    const result = await deleteProductInDb(id); // Cambié a deleteProductInDb
    if (!result) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
