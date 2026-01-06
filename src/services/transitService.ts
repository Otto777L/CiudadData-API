import axios from 'axios';
import dotenv from 'dotenv';
import Incident, { IIncident } from '../models/incident';

dotenv.config();

const BASE_URL = process.env.TFL_API_URL;
const APP_KEY = process.env.TFL_APP_KEY;

export const getLondonRoutes = async () => {
    const response = await axios.get(`${BASE_URL}/Line/Mode/tube,bus/Route?app_key=${APP_KEY}`);
    return response.data;
};

export const getArrivals = async (stopId: string) => {
    const response = await axios.get(`${BASE_URL}/StopPoint/${stopId}/Arrivals?app_key=${APP_KEY}`);
    return response.data;
};

export const createIncident = async (data: Partial<IIncident>) => {
    const newIncident = new Incident(data);
    return await newIncident.save();
};