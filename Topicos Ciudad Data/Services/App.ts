import express from 'express';
import geoRoutes from './GeoService'; 
import healthRoutes from './HealthService';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/GeoService', geoRoutes);
app.use('/HealthService', healthRoutes);

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});