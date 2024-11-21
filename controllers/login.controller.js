import jwt from 'jsonwebtoken'; // Importar librería para JWT
//import bcrypt from 'bcrypt'; // Para manejar contraseñas cifradas
import LoginModel from '../models/login.model.js'; // Modelo del usuario

const LoginController = {
    /**
     * Controlador para manejar el inicio de sesión
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Verifica si el usuario existe
            const user = await LoginModel.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Valida la contraseña cifrada
            const isPasswordValid = await (password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Genera el token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET, // Define este secreto en tu archivo .env
                { expiresIn: '1h' } // Token válido por 1 hora
            );

            // Responde con el token y datos del usuario
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
};

export default LoginController;