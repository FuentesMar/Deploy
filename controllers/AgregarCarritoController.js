// Back-end/controllers/AgregarCarritoController.js
import { Product, Cart, CartProduct } from '../models/index.model.js';

export const addToCart = async (req, res) => {
    const { userId, productId } = req.params; // Obtener los IDs desde los parámetros de la URL
    console.log('userId:', userId, 'productId:', productId); // Verificar valores entrantes

    try {
        // 1. Intentar encontrar el producto
        const product = await Product.findOne({ where: { productId } });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (product.stockQuantity <= 0) {
            return res.status(400).json({ error: 'Producto sin stock' });
        }

        // 2. Obtener el carrito pendiente del usuario
        const cart = await Cart.findOne({ where: { userId, status: 'pending' } });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado para el usuario' });
        }

        // 3. Verificar si el producto ya está en el carrito
        const cartProduct = await CartProduct.findOne({
            where: { cartId: cart.cartId, productId }
        });

        if (cartProduct) {
            // Incrementar cantidad del producto en el carrito
            await cartProduct.update({ quantity: cartProduct.quantity + 1 });
        } else {
            // Agregar el producto al carrito con cantidad inicial de 1
            await CartProduct.create({ cartId: cart.cartId, productId, quantity: 1 });
        }

        // 4. Reducir el stock del producto en 1
        await product.update({ stockQuantity: product.stockQuantity - 1 });

        // 5. Responder con el estado actualizado del carrito
        const updatedProducts = await CartProduct.findAll({
            where: { cartId: cart.cartId },
            include: [{ model: Product }] // Incluir detalles del producto
        });

        return res.json({
            message: 'Producto agregado al carrito exitosamente',
            products: updatedProducts
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener carrito pendiente para un usuario
export const getPendingCart = async (req, res) => {
    const { userId } = req.params;
    console.log('User ID recibido:', userId);

    try {
        const cart = await Cart.findOne({ where: { userId: Number(userId), status: 'pending' } });
        console.log('Carrito encontrado:', cart);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito pendiente no encontrado' });
        }

        const products = await CartProduct.findAll({
            where: { cartId: cart.cartId },
            include: [{ model: Product }]
        });
        console.log('Productos en el carrito:', products);

        res.json({ cart, products });
    } catch (error) {
        console.error('Detalles del error:', error);
        res.status(500).json({ error: 'Error al obtener carrito pendiente' });
    }
};

// Actualizar cantidad de producto en carrito
export const updateCartProduct = async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cartProduct = await CartProduct.findOne({ where: { cartId: cartId, productId: productId } });

        if (!cartProduct) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        const product = await Product.findOne({ where: { productId: productId } });

        if (!product || quantity > product.stockQuantity + cartProduct.quantity) {
            return res.status(400).json({ error: 'Cantidad no válida o stock insuficiente' });
        }

        await cartProduct.update({ quantity });
        await product.update({ stockQuantity: product.stockQuantity + cartProduct.quantity - quantity });

        res.json({ message: 'Cantidad actualizada exitosamente', cartProduct });
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        res.status(500).json({ error: 'Error al actualizar cantidad' });
    }
};

// Eliminar producto del carrito
export const removeCartProduct = async (req, res) => {
    const { userId, cartProductId, productId } = req.params;
  
    console.log('Datos recibidos:', { userId, cartProductId, productId });
  
    try {
      // Primero, obtenemos el cartId asociado con el userId
      const cart = await Cart.findOne({ where: { userId: userId } });
  
      if (!cart) {
        console.log('Carrito no encontrado para el usuario');
        return res.status(404).json({ error: 'Carrito no encontrado para el usuario' });
      }
  
      // Verifica si el producto existe en el carrito del usuario
      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cart.cartId,  // Utilizamos el cartId obtenido
          cartProductId: cartProductId,  // Verifica el cartProductId
          productId: productId  // Verifica el productId
        }
      });
  
      if (!cartProduct) {
        console.log('Producto no encontrado en el carrito');
        return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
      }
  
      // Encuentra el producto en la base de datos para actualizar su stock
      const product = await Product.findOne({ where: { productId: productId } });
  
      if (!product) {
        console.log('Producto no encontrado en la base de datos');
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Actualiza la cantidad de stock
      await product.update({ stockQuantity: product.stockQuantity + cartProduct.quantity });
  
      // Elimina el producto del carrito
      await cartProduct.destroy();
  
      console.log('Producto eliminado correctamente');
      res.status(200).json({ message: 'Producto eliminado correctamente del carrito' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  };  

// Confirmar carrito
export const confirmCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await Cart.findOne({ where: { cartId: cartId, status: 'pending' } });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado o ya confirmado' });
        }

        await cart.update({ status: 'confirmed' });

        // Crear nuevo carrito para el usuario
        await Cart.create({ userId: cart.userId, status: 'pending' });

        res.json({ message: 'Carrito confirmado y nuevo carrito generado' });
    } catch (error) {
        console.error('Error al confirmar carrito:', error);
        res.status(500).json({ error: 'Error al confirmar carrito' });
    }
};