// src/routes/healthRoutes.ts
import { Router } from 'express';
import { getMortalityRate, getLifeExpectancy } from '../controllers/healthController';

const router = Router();

router.get('/mortality/:country', getMortalityRate); // obtiene la tasa de mortalidad
router.get('/life-expectancy/:country', getLifeExpectancy); // obtiene la esperanza de vida

export default router;