import { Request, Response } from 'express';
import * as healthService from '../services/healthService';

export const getMortalityRate = async (req: Request, res: Response) => {
    try {
        const { country } = req.params;
        // 'CDR' es el código de Crude Death Rate
        const data = await healthService.fetchOMSData('CDR', country);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `No hay datos para ${country}` });
        }

        const ultimo = data[data.length - 1];
        res.json({
            pais: country,
            indicador: 'Mortalidad',
            valor: ultimo.NumericValue,
            anio: ultimo.TimeDim
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en API OMS' });
    }
};

export const getLifeExpectancy = async (req: Request, res: Response) => {
    try {
        const { country } = req.params;
        // WHOSIS_000001 es Esperanza de Vida
        const data = await healthService.fetchOMSData('WHOSIS_000001', country);
        
        // Filtramos 'BTSX' (Both Sexes - Ambos sexos)
        const filtrado = data.filter((item: any) => item.Dim1 === 'BTSX');

        if (!filtrado || filtrado.length === 0) {
            return res.status(404).json({ error: 'No hay datos de esperanza de vida' });
        }

        const ultimo = filtrado[filtrado.length - 1];
        res.json({
            pais: country,
            indicador: 'Esperanza de Vida (Ambos Sexos)',
            valor: ultimo.NumericValue,
            anio: ultimo.TimeDim
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en API OMS' });
    }
};