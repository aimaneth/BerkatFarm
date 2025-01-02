export interface ILivestock {
  _id: string;
  tag: string;
  type: string;
  breed: string;
  birthDate: Date;
  gender: 'male' | 'female';
  weight: number;
  status: 'healthy' | 'sick' | 'quarantined' | 'deceased';
  location: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDistribution {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    contact: string;
    address: string;
  };
  items: Array<{
    livestock: string;
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

export interface ITeamMember {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  department: string;
  contact: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
} 