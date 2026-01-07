// src/routes/healthRoutes.ts
import { Router } from 'express';
import { getMortalityRate, getLifeExpectancy } from '../controllers/healthController';

const router = Router();

router.get('/mortality/:country', getMortalityRate);
router.get('/life-expectancy/:country', getLifeExpectancy);

export default router;