import { Schema, model, Document } from 'mongoose';

export interface ILivestock extends Document {
  tag: string;
  type: string;
  breed: string;
  birthDate: Date;
  weight: number;
  health: {
    status: 'healthy' | 'sick' | 'under_treatment';
    lastCheckup: Date;
    vaccinations: Array<{
      name: string;
      date: Date;
    }>;
  };
  location: string;
  status: 'active' | 'sold' | 'deceased';
  createdAt: Date;
  updatedAt: Date;
}

const LivestockSchema = new Schema({
  tag: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  birthDate: { type: Date, required: true },
  weight: { type: Number, required: true, min: 0 },
  health: {
    status: { 
      type: String, 
      enum: ['healthy', 'sick', 'under_treatment'], 
      default: 'healthy',
      required: true
    },
    lastCheckup: { type: Date, default: Date.now },
    vaccinations: [{
      name: { type: String, required: true },
      date: { type: Date, required: true }
    }]
  },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'sold', 'deceased'], 
    default: 'active',
    required: true
  },
}, { 
  timestamps: true,
  versionKey: false
});

export const Livestock = model<ILivestock>('Livestock', LivestockSchema);
export default Livestock; 