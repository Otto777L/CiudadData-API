import mongoose, { Schema, Document } from 'mongoose';

export interface IGeo extends Document {
  nombre: string;
  pais: string;
  coords: {
    lat: number;
    lng: number;
  };
  poblacion?: number;
  fecha: Date;
}

const GeoSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  pais: { type: String, required: true },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  poblacion: { type: Number },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model<IGeo>('GeoData', GeoSchema);