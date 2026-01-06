import mongoose, { Schema, Document } from 'mongoose';

export interface IIncident extends Document {
  type: string; 
  description: string;
  location: string;
  date: Date;
}

const IncidentSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IIncident>('Incident', IncidentSchema);