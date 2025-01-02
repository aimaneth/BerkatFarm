import { Schema, model, Document, Types } from 'mongoose';

export interface IDistribution extends Document {
  orderId: string;
  customer: {
    name: string;
    contact: string;
    address: string;
  };
  items: Array<{
    livestock: Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliveryDate: Date;
  trackingInfo: {
    carrier: string;
    trackingNumber: string;
    location: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DistributionSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [{
    livestock: { type: Schema.Types.ObjectId, ref: 'Livestock', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  }],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
    required: true
  },
  deliveryDate: { type: Date },
  trackingInfo: {
    carrier: { type: String, default: '' },
    trackingNumber: { type: String, default: '' },
    location: { type: String, default: '' }
  }
}, { 
  timestamps: true,
  versionKey: false
});

export const Distribution = model<IDistribution>('Distribution', DistributionSchema);
export default Distribution; 