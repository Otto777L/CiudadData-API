import axios from 'axios';
import * as transportService from '../services/transitService';
import Incident from '../models/incident';

// Mock de Axios para las APIs externas (TfL)
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock del modelo de Mongoose para no usar la BD real
jest.mock('../models/incident');

describe('Pruebas en TransistTest.ts', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Servicios de API TfL', () => {
        it('getLondonRoutes debe retornar datos de la API', async () => {
            const mockData = [{ id: 'tube', modeName: 'tube' }];
            mockedAxios.get.mockResolvedValueOnce({ data: mockData });

            const result = await transportService.getLondonRoutes();
            expect(result).toEqual(mockData);
        });
    });

    describe('Servicios de Base de Datos (Mongoose)', () => {
        it('getAllIncidents debe retornar la lista de la DB', async () => {
            const mockDocs = [{ type: 'retraso', description: 'Problema en línea Victoria' }];
            // Simulamos el método find() de Mongoose
            (Incident.find as jest.Mock).mockResolvedValueOnce(mockDocs);

            const result = await transportService.getAllIncidents();
            expect(result).toEqual(mockDocs);
            expect(Incident.find).toHaveBeenCalled();
        });

        it('createIncident debe guardar un nuevo registro', async () => {
            const incidentData = { type: 'huelga', description: 'Huelga de transporte' };
            
            // Simulamos el constructor y el método save()
            const saveMock = jest.fn().mockResolvedValueOnce({ _id: '507f1', ...incidentData });
            (Incident as unknown as jest.Mock).mockImplementation(() => ({
                save: saveMock
            }));

            const result = await transportService.createIncident(incidentData);
            expect(result._id).toBe('507f1');
            expect(saveMock).toHaveBeenCalled();
        });
    });
});