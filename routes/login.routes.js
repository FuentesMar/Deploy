import { Router } from 'express'; // Importa el router de Express
import LoginController from '../controllers/login.controller.js'; // Importa el controlador

const router = Router(); // Crea una instancia de router

// Ruta para el login
router.post('/login', LoginController.login);

// Exporta el router
export default router;