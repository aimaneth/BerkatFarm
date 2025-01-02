export interface Livestock {
  _id: string;
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
}

export interface TeamMember {
  _id: string;
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
}

export interface Distribution {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    contact: string;
    address: string;
  };
  items: Array<{
    livestock: Livestock;
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
}

export interface Activity {
  _id: string;
  type: 'livestock' | 'team' | 'distribution';
  action: string;
  description: string;
  timestamp: Date;
  user: string;
  entityId: string;
} 