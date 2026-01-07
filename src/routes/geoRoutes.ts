// src/routes/geoRoutes.ts
import { Router } from 'express';
import { searchCity, getPopulation } from '../controllers/geoController';

const router = Router();

router.get('/city/:city', searchCity);
router.get('/population/:code', getPopulation);

export default router;