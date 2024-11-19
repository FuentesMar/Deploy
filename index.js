import express from 'express';
import dotenv from 'dotenv';
import connection from './config/db.js'; 
import productRoutes from './routes/product.routes.js';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use('/products', productRoutes);

// Sincronizar los modelos con la base de datos
const syncDatabase = async () => {
    try {
        await connection.sync({ force: false }); // Cambia a true solo en desarrollo
        console.log('Tablas sincronizadas con éxito.');
    } catch (error) {
        console.error('Error al sincronizar las tablas: ', error);
    }
};

app.use(express.static(path.join(path.resolve(), "public")));
app.get('*', (req, res) => {
    return res.sendFile(path.join(path.resolve(), "public", "index.html"))
})

// Iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    await syncDatabase(); // Sincroniza la base de datos al iniciar el servidor
});
