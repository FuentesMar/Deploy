import User from '../models/registro.model.js';

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password, userType } = req.body;

    try {
        // Validar que todos los campos estén presentes
        if (!name || !email || !password || !userType) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Crear un usuario en la base de datos
        const newUser = await User.create({ name, email, password, userType });

        // Responder con el usuario creado
        return res.status(201).json({
            message: 'Usuario registrado con éxito.',
            user: {
                userId: newUser.userId,
                name: newUser.name,
                email: newUser.email,
                userType: newUser.userType,
            },
        });
    } catch (error) {
        // Manejo de errores
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }
        return res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
};

export { createUser };
