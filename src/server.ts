import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transitRoutes from './routes/transitRoutes';
import geoRoutes from './routes/geoRoutes';
import healthRoutes from './routes/healthRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

// Se usa para interpretar lo que contiene el archivo JSON en las solicitudes
app.use(express.json());

// Rutas
app.use('/transit', transitRoutes);
app.use('/geo', geoRoutes);
app.use('/health', healthRoutes);

// Conexión a Base de Datos y arranque del servidor
console.log("⏳ Intentando conectar a MongoDB...");

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado exitosamente a MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error CRÍTICO conectando a MongoDB:', err);
        // Esto permite que el servidor siga corriendo incluso sin conexión a la base de datos
        app.listen(PORT, () => {
            console.log(`⚠️ Servidor corriendo SIN BASE DE DATOS en http://localhost:${PORT}`);
        });
    });