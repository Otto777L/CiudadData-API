import axios from 'axios';
import dotenv from 'dotenv';
import Incident, { IIncident } from '../models/incident';

dotenv.config();

const BASE_URL = process.env.TFL_API_URL;
const APP_KEY = process.env.TFL_APP_KEY;

// obtiene las rutas de Londres
export const getLondonRoutes = async () => {
    const response = await axios.get(`${BASE_URL}/Line/Mode/tube,bus/Route?app_key=${APP_KEY}`);
    return response.data;
};

// obtiene los tiempos de llegada para una parada específica
export const getArrivals = async (stopId: string) => {
    const response = await axios.get(`${BASE_URL}/StopPoint/${stopId}/Arrivals?app_key=${APP_KEY}`);
    return response.data;
};

// crea un nuevo incidente en la base de datos
export const createIncident = async (data: Partial<IIncident>) => {
    const newIncident = new Incident(data);
    return await newIncident.save();
};

// obtiene todos los incidentes reportados
export const getAllIncidents = async () => {
    return await Incident.find(); 
};