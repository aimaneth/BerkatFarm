import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  type: 'livestock' | 'team' | 'distribution';
  action: string;
  description: string;
  timestamp: Date;
  user: string;
  entityId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema({
  type: { 
    type: String, 
    enum: ['livestock', 'team', 'distribution'],
    required: true 
  },
  action: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId, required: true, refPath: 'type' },
}, { 
  timestamps: true,
  versionKey: false 
});

export const Activity = model<IActivity>('Activity', ActivitySchema);
export default Activity; 