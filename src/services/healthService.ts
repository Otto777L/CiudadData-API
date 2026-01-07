// src/services/healthService.ts
import axios from 'axios';
import https from 'https';

// Este agente permite saltarse errores de certificado SSL de la OMS (es el truco de ella)
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