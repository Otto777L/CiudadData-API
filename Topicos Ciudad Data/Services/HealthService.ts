import { Router } from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import https from 'node:https';

const router = Router();

const agent = new https.Agent({ rejectUnauthorized: false });


async function fetchOMS(indicator: string, country: string) {
    const url = `https://ghoapi.azureedge.net/api/${indicator}?$filter=SpatialTimeperiodCode%20eq%20'${country}'`;
    
    const response = await axios.get(url, { 
        httpsAgent: agent,
        headers: { 'Accept': 'application/json' } 
    });
    return response.data.value;
}


router.get('/rate/:pais', async (req: Request, res: Response) => {
    const p = req.params.pais.toUpperCase().trim();
    try {
        
        const data = await fetchOMS('CDR', p);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: `No hay datos de mortalidad para ${p}` });
        }

        const ultimo = data[data.length - 1];
        res.json({
            pais: p,
            mortalidad: ultimo.NumericValue,
            anio: ultimo.TimeDim
        });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ 
            error: 'Error en API OMS', 
            detalle: error.message 
        });
    }
});


router.get('/hope/:pais', async (req: Request, res: Response) => {
    const p = req.params.pais.toUpperCase().trim();
    try {
        const data = await fetchOMS('WHOSIS_000001', p);
        
        
        const filtrado = data.filter((item: any) => item.Dim1 === 'BTSX');

        if (filtrado.length === 0) {
            return res.status(404).json({ error: 'No hay datos de esperanza de vida' });
        }

        const ultimo = filtrado[filtrado.length - 1];
        res.json({
            pais: p,
            esperanza: ultimo.NumericValue,
            anio: ultimo.TimeDim
        });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: 'Error en API OMS' });
    }
});

export default router;