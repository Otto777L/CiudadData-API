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

export const reportIncident = async (req: Request, res: Response) => {
    try {
        const incident = await transitService.createIncident(req.body);
        res.status(201).json(incident);
    } catch (error) {
        res.status(500).json({ error: "No se pudo guardar el reporte de incidente" });
    }
};