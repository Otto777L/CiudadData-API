import axios from 'axios';

// Función para conectar al Banco Mundial
const fetchWorldBankData = async (countryCode: string, indicator: string) => {
    try {
        const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json`;
        const response = await axios.get(url);

        // Validación de datos recibidos
        if (!response.data || !response.data[1]) {
            return null;
        }

        const listaDatos = response.data[1];

        // Debido a que los años más recientes pueden estar vacios, buscamos el primer dato no nulo
        const datoValido = listaDatos.find((item: any) => item.value !== null);

        if (!datoValido) return null; // Si todos son nulos, devolvemos null
        
        return {
            country: datoValido.country.value,
            year: datoValido.date,
            value: parseFloat(datoValido.value).toFixed(2)
        };
    } catch (error) {
        console.error(`Error buscando indicador ${indicator}:`, error);
        throw error;
    }
};

// SP.DYN.LE00.IN = Esperanza de Vida
export const getLifeExpectancyWB = async (country: string) => {
    return await fetchWorldBankData(country, 'SP.DYN.LE00.IN');
};

// SP.DYN.CDRT.IN = Tasa de Mortalidad
export const getMortalityWB = async (country: string) => {
    return await fetchWorldBankData(country, 'SP.DYN.CDRT.IN');
};