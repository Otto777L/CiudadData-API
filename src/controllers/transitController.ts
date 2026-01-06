import { Request, Response } from 'express';
import * as transitService from '../services/transitService';

export const getRoutes = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;
        if (city.toLowerCase() !== 'london') {
            return res.status(404).json({ message: `Solo está disponible para consulta "London"` });
        }
        const data = await transitService.getLondonRoutes();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error conectando con API externa" });
    }
};

export const getEta = async (req: Request, res: Response) => {
    try {
        const { stop_id } = req.query;
        
        if (!stop_id) {
             return res.status(400).json({ error: "Falta la id de parada (stop_id)" });
        }

        const data = await transitService.getArrivals(stop_id as string);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo los tiempos de llegada" });
    }
};

// guarda un reporte de incidente
export const reportIncident = async (req: Request, res: Response) => {
    try {
        // 1. log para mostrar datos del body
        console.log("📩 Datos recibidos en el body:", req.body);

        const incident = await transitService.createIncident(req.body);
        res.status(201).json(incident);
    } catch (error) {
        // 2. Indica falla en mongoDB
        console.error("❌ Error EXACTO de MongoDB:", error);
        
        res.status(500).json({ error: "No se pudo guardar el reporte de incidente" });
    }
};

// obtiene todos los incidentes reportados
export const getIncidents = async (req: Request, res: Response) => {
    try {
        const incidents = await transitService.getAllIncidents();
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo reportes" });
    }
};