import { Router } from 'express';
// Importamos todas las funciones del controlador
import { searchCity, getPopulation, saveCity, getSavedCities } from '../controllers/geoController';

const router = Router();

// Rutas
router.get('/city/:city', searchCity);
router.get('/population/:code', getPopulation);
router.post('/city', saveCity);       
router.get('/saved', getSavedCities); 

export default router;