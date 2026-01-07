import axios from 'axios';
import https from 'https';
import HealthModel, { IHealth } from '../models/HealthData';

const agent = new https.Agent({ rejectUnauthorized: false });

export const fetchOMSData = async (indicator: string, country: string) => {
    // Convertimos el país a mayúsculas por si acaso
    const cleanCountry = country.toUpperCase().trim();
    
    const url = `https://ghoapi.azureedge.net/api/${indicator}?$filter=SpatialTimeperiodCode%20eq%20'${cleanCountry}'`;
    
    try {
        const response = await axios.get(url, { 
            httpsAgent: agent,
            headers: { 'Accept': 'application/json' } 
        });
        
        return response.data.value;
    } catch (error) {
        console.error("Error OMS Service:", error);
        throw error;
    }
};

// Crea un nuevo registro de salud en la base de datos 
export const createHealthRecord = async (data: Partial<IHealth>) => {
    const newRecord = new HealthModel(data);
    return await newRecord.save();
};

// Obtiene todos los registros de salud guardados
export const getAllHealthRecords = async () => {
    return await HealthModel.find(); 
};