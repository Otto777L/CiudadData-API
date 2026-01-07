import { Request, Response } from 'express';
import * as geoService from '../services/geoService';

export const searchCity = async (req: Request, res: Response) => {
    try {
        const { city } = req.params;
        const data = await geoService.getCityData(city);
        
        if (!data) return res.status(404).json({ message: 'No se encontró la ciudad' });
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error conectando con GeoNames' });
    }
};

export const getPopulation = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const data = await geoService.getWorldBankPopulation(code);
        
        if (!data) return res.status(404).json({ message: 'No hay datos del Banco Mundial' });
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error buscando población' });
    }
};

export const saveCity = async (req: Request, res: Response) => {
    try {
        // Esto permite crear un nuevo record geografico  
        const newCity = await geoService.createGeoRecord(req.body);
        res.status(201).json(newCity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo guardar la ciudad" });
    }
};

export const getSavedCities = async (req: Request, res: Response) => {
    try {
        //  Esto permite consultar la lista de records geograficos
        const cities = await geoService.getAllGeoRecords();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo ciudades guardadas" });
    }
};