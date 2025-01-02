import { Schema, model, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  performance: {
    tasks: Array<{
      name: string;
      status: 'pending' | 'in_progress' | 'completed';
      dueDate: Date;
    }>;
    metrics: {
      efficiency: number;
      taskCompletion: number;
    };
  };
  status: 'active' | 'on_leave' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  performance: {
    tasks: [{
      name: { type: String, required: true },
      status: { 
        type: String, 
        enum: ['pending', 'in_progress', 'completed'], 
        default: 'pending',
        required: true
      },
      dueDate: { type: Date, required: true }
    }],
    metrics: {
      efficiency: { type: Number, default: 0, min: 0, max: 100 },
      taskCompletion: { type: Number, default: 0, min: 0, max: 100 }
    }
  },
  status: { 
    type: String, 
    enum: ['active', 'on_leave', 'inactive'], 
    default: 'active',
    required: true
  }
}, { 
  timestamps: true,
  versionKey: false
});

// Add index for email
TeamSchema.index({ email: 1 }, { unique: true });

export const Team = model<ITeam>('Team', TeamSchema);
export default Team; 