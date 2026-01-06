import { Router } from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import fs from 'node:fs/promises';

const router = Router();
const archivoReportes = './reportes.json';
const userGeo = 'Norbe';

async function cargarReportes() {
  try {
    const contenido = await fs.readFile(archivoReportes, 'utf-8');
    return JSON.parse(contenido);
  } catch (e) {
    return [];
  }
}


router.get('/city/:city', async (req: Request, res: Response) => {
  const ciudad = req.params.city;
  try {
    const resGeo = await axios.get(`http://api.geonames.org/searchJSON?q=${ciudad}&maxRows=1&username=${userGeo}`);
    if (resGeo.data.geonames.length === 0) return res.status(404).send('No se encontro la ciudad');

    const info = resGeo.data.geonames[0];
    res.json({
      nombre: info.name,
      pais: info.countryName,
      coords: { lat: info.lat, lng: info.lng },
      poblacion: info.population
    });
  } catch (err) {
    res.status(500).send('Error con GeoNames');
  }
});


router.get('/population/:code', async (req: Request, res: Response) => {
  try {
    const url = `https://api.worldbank.org/v2/country/${req.params.code}/indicator/SP.POP.TOTL?format=json`;
    const resultado = await axios.get(url);

    const datos = resultado.data[1][0];
    res.json({
      pais: datos.country.value,
      year: datos.date,
      total: datos.value
    });
  } catch (error) {
    res.status(404).send('Error al buscar poblacion en el Banco Mundial');
  }
});


router.post('/report', async (req: Request, res: Response) => {
  const { ciudad, tipoIncidencia, descripcion } = req.body;
  if (!ciudad || !tipoIncidencia) return res.status(400).send('Faltan datos obligatorios');

  const lista = await cargarReportes();
  const nuevo = { 
    id: Date.now(), 
    ciudad, 
    tipoIncidencia, 
    descripcion, 
    fecha: new Date().toLocaleString() 
  };
  lista.push(nuevo);
  
  await fs.writeFile(archivoReportes, JSON.stringify(lista, null, 2));
  res.json({ msj: 'Reporte guardado', reporte: nuevo });
});

export default router;