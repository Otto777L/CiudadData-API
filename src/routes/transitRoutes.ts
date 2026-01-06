import { Router } from 'express';
import { getRoutes, getEta, reportIncident } from '../controllers/transitController';

const router = Router();

router.get('/routes/:city', getRoutes);
router.get('/eta', getEta);
router.post('/incident', reportIncident);

export default router;