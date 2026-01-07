import axios from 'axios';
import { getCityData, getWorldBankPopulation } from '../services/geoService';
// usamos Mock para simular axios para no hacer peticiones reales
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Pruebas en GeoTest.ts', () => {

    it('getCityData debería retornar datos procesados de GeoNames', async () => {
        const mockResponse = {
            data: {
                geonames: [{
                    name: 'Caracas',
                    countryName: 'Venezuela',
                    lat: '10.48',
                    lng: '-66.90',
                    population: 3000000
                }]
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getCityData('Caracas');

        expect(result).not.toBeNull();
        expect(result?.nombre).toBe('Caracas');
        expect(result?.pais).toBe('Venezuela');
    });

    it('getWorldBankPopulation debería retornar datos del Banco Mundial', async () => {
        const mockWB = {
            data: [
                {}, 
                [{ country: { value: 'Venezuela' }, date: '2022', value: 28000000 }]
            ]
        };
        mockedAxios.get.mockResolvedValueOnce(mockWB);

        const result = await getWorldBankPopulation('VE');
        expect(result?.total).toBe(28000000);
    });
});