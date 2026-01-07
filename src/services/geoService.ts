// src/services/geoService.ts
import axios from 'axios';

const USER_GEO = 'Norbe'; // Usuario de ella

export const getCityData = async (city: string) => {
    try {
        const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${USER_GEO}`;
        const response = await axios.get(url);

        if (!response.data.geonames || response.data.geonames.length === 0) {
            return null;
        }

        const info = response.data.geonames[0];
        // Limpiamos los datos para devolver solo lo útil
        return {
            nombre: info.name,
            pais: info.countryName,
            coords: { lat: info.lat, lng: info.lng },
            poblacion: info.population
        };
    } catch (error) {
        console.error("Error en GeoService:", error);
        throw error;
    }
};

export const getWorldBankPopulation = async (countryCode: string) => {
    try {
        const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`;
        const response = await axios.get(url);

        if (!response.data || !response.data[1]) return null;

        const datos = response.data[1][0];
        return {
            pais: datos.country.value,
            year: datos.date,
            total: datos.value
        };
    } catch (error) {
        console.error("Error en WorldBank Service:", error);
        throw error;
    }
};