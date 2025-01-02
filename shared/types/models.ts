export interface ITeam {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILivestock {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDistribution {
  _id?: string;
  orderId: string;
  customer: {
    name: string;
    contact: string;
    address: string;
  };
  items: Array<{
    livestock: string | ILivestock;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActivity {
  _id?: string;
  type: 'livestock' | 'team' | 'distribution';
  action: string;
  description: string;
  timestamp: Date;
  user: string;
  entityId: string;
  createdAt?: Date;
  updatedAt?: Date;
} 