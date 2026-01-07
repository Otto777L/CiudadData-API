import mongoose, { Schema, Document } from 'mongoose';

export interface IHealth extends Document {
  pais: string;
  indicador: string;      
  valor: number;          
  año: string;            
  fechaRegistro: Date;
}

const HealthSchema: Schema = new Schema({
  pais: { type: String, required: true },
  indicador: { type: String, required: true },
  valor: { type: Number, required: true },
  año: { type: String },
  fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model<IHealth>('HealthData', HealthSchema);