//Back-end/index.js
import express from 'express';
import sequelize from './config/db.js';
import userRouter from './routes/UserRoutes.js';
import adminRouter from './routes/AdminRoutes.js';
import cors from 'cors';
import productController from './controllers/ProductController.js';
import userController from './controllers/UserController.js';
import PaymentController from './controllers/PaymentController.js';
import CartController from './controllers/CartController.js';
import loginRoutes from './routes/login.routes.js';
import { Product, User, Order, Cart, Payment, Contact, Review, CartProduct, OrderProduct, SoldItem } from './models/index.model.js';  // Asegúrate de importar todos los modelos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
  methods: 'GET,POST,DELETE', // Métodos HTTP permitidos
  allowedHeaders: 'Content-Type'
}));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Ruta de la API para obtener usuarios
app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/api/auth', loginRoutes);

//Rutas para CRUD
app.get('/getproducts', productController.getProducts);
app.get('/getproductbyname', productController.getProductByName);
app.get('/productsfilteredandsorted', productController.productsFilteredAndSorted);
app.get('/getproductbyid/:productId', productController.getProductByID);
app.get('/getuserbyid/:userId', userController.getUserByID);

// Ruta para confirmar el pedido y crear un registro de pago
app.post('/payment', PaymentController.createPayment);
app.post('/createcart', CartController.createNewCart);

// Conectar con la base de datos y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL con Sequelize');
    //return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
  });

  app.use(express.static(path.join(path.resolve(), "public")));
  app.get('*', (req, res) => {
    return res.sendFile(path.join(path.resolve(), "public", "index.html"))
})

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});