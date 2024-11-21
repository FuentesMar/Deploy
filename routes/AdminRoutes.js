// Back-end/routes/AdminRoutes.js
import express from 'express';
import productController from '../controllers/ProductController.js';

const router = express.Router();

// Ruta para obtener usuarios en /admins/:userId/...
//router.post('/:id/');


//Rutas para el CRUD en /admins/:userId/... 
// Ver todos los productos /admins/
//router.get('/:userid/getproducts', productController.getProducts);


/*
// Ver un producto específico
router.get('/:userid/:id/getproduct', productController.getProduct);

// Agregar un producto
router.post('/:userid/createproduct', productController.createProduct);

// Editar un producto
router.put('/:userid/:id/updateproduct', productController.updateProduct);

// Eliminar un producto
router.delete('/:userid/:id/deleteproduct', productController.deleteProduct);

// Back-end/routes/AdminRoutes.js
router.get('/:userid/products/getproductbyname', productController.getProductByName); // Corregido

router.get('/:userid/productsfilteredandsorted', productController.productsFilteredAndSorted);
*/

export default router;