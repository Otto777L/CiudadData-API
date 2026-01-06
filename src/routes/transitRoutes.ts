import { Router } from 'express';
import { getRoutes, getEta, reportIncident, getIncidents } from '../controllers/transitController';

const router = Router();

// Rutas de tránsito
router.get('/routes/:city', getRoutes);
router.get('/eta', getEta);
router.get('/incidents', getIncidents);
router.post('/incident', reportIncident);

export default router;