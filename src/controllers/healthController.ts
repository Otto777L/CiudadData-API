import { Request, Response } from 'express';
import * as healthService from '../services/healthService';

export const getLifeExpectancy = async (req: Request, res: Response) => {
    try {
        const { country } = req.params;
        const data = await healthService.getLifeExpectancyWB(country);

        if (!data) return res.status(404).json({ error: 'No hay datos disponibles' });

        res.json({
            metric: 'Esperanza de Vida (Años)',
            ...data,
            source: 'Banco Mundial (Opción alternativa para sustituir a OMS)'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo datos de salud' });
    }
};

export const getMortalityRate = async (req: Request, res: Response) => {
    try {
        const { country } = req.params;
        const data = await healthService.getMortalityWB(country);

        if (!data) return res.status(404).json({ error: 'No hay datos disponibles' });

        res.json({
            metric: 'Tasa de Mortalidad (por cada 1000 personas)',
            ...data,
            source: 'Banco Mundial (Sustituye a OMS)'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo datos de salud' });
    }
};