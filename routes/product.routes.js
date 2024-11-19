import express from 'express';
import productController from '../controllers/product.controller.js'; // Asegúrate de usar la extensión .js

const router = express.Router();

// Ver todos los productos
router.get('/', productController.getProducts);

// Ver un producto específico
router.get('/:id', productController.getProduct);

// Agregar un producto
router.post('/', productController.createProduct);

// Editar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

export default router;
