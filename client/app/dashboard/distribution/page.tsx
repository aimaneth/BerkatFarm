'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  SlidersHorizontal as SlidersIcon,
  Truck as TruckIcon,
  Package as PackageIcon,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { DistributionForm } from '@/components/distribution/DistributionForm';
import { DistributionDetails } from '@/components/distribution/DistributionDetails';

// Sample data
const distributions = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    product: 'Fresh Milk',
    quantity: '500 liters',
    customer: 'Metro Supermarket',
    destination: 'City Center Branch',
    status: 'in-transit',
    deliveryDate: '2024-02-20',
    driver: 'John Smith',
    vehicle: 'Truck-01',
    price: '$750.00',
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    product: 'Organic Eggs',
    quantity: '200 dozens',
    customer: 'Green Grocers',
    destination: 'Downtown Store',
    status: 'pending',
    deliveryDate: '2024-02-21',
    driver: 'Mike Johnson',
    vehicle: 'Van-03',
    price: '$600.00',
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    product: 'Cheese',
    quantity: '100 kg',
    customer: 'Restaurant Supplies Co.',
    destination: 'Warehouse B',
    status: 'delivered',
    deliveryDate: '2024-02-19',
    driver: 'Sarah Wilson',
    vehicle: 'Truck-02',
    price: '$1,200.00',
  },
];

export default function DistributionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [isAddingDistribution, setIsAddingDistribution] = useState(false);
  const [selectedDistribution, setSelectedDistribution] = useState<typeof distributions[0] | null>(null);

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
    </div>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const handleAddDistribution = (data: any) => {
    console.log('Adding new distribution:', data);
    // TODO: Implement API call to add distribution
    const newDistribution = {
      id: distributions.length + 1,
      ...data,
    };
    distributions.push(newDistribution);
  };

  const handleViewDetails = (distribution: typeof distributions[0]) => {
    setSelectedDistribution(distribution);
  };

  const handleUpdateStatus = (distributionId: number, newStatus: string) => {
    console.log('Updating status:', distributionId, newStatus);
    // TODO: Implement API call to update status
  };

  const filteredDistributions = distributions.filter(dist => {
    const matchesSearch = 
      dist.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dist.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dist.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dist.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Distribution Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your farm's product distribution and deliveries
          </p>
        </div>
        <Button 
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
          size="sm"
          onClick={() => setIsAddingDistribution(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Distribution
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100">
              <TruckIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Deliveries</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <PackageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">145</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100">
              <MapPinIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Destinations</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-100">
              <CalendarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col gap-4">
          {/* Search Row */}
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order number, product, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-white"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">All Status</SelectItem>
                  <SelectItem value="pending" className="hover:bg-gray-100">Pending</SelectItem>
                  <SelectItem value="in-transit" className="hover:bg-gray-100">In Transit</SelectItem>
                  <SelectItem value="delivered" className="hover:bg-gray-100">Delivered</SelectItem>
                </SelectContent>
              </Select>

              <Select value="all">
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">Latest First</SelectItem>
                  <SelectItem value="oldest" className="hover:bg-gray-100">Oldest First</SelectItem>
                  <SelectItem value="price-high" className="hover:bg-gray-100">Price: High to Low</SelectItem>
                  <SelectItem value="price-low" className="hover:bg-gray-100">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="w-10 h-10 p-0 bg-white shrink-0"
            >
              <SlidersIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Distribution List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDistributions.map((dist) => (
          <Card key={dist.id} className="p-4 bg-white hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{dist.orderNumber}</h3>
                    <p className="text-sm text-gray-500">{dist.product}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}>
                    {dist.status.charAt(0).toUpperCase() + dist.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="text-sm font-medium text-gray-900">{dist.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="text-sm font-medium text-gray-900">{dist.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Date</p>
                    <p className="text-sm font-medium text-gray-900">{dist.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-sm font-medium text-gray-900">{dist.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="text-sm font-medium text-gray-900">{dist.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driver</p>
                    <p className="text-sm font-medium text-gray-900">{dist.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="text-sm font-medium text-gray-900">{dist.vehicle}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white"
                  onClick={() => handleViewDetails(dist)}
                >
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  Update Status
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution Form Dialog */}
      <DistributionForm
        isOpen={isAddingDistribution}
        onClose={() => setIsAddingDistribution(false)}
        onSubmit={handleAddDistribution}
        mode="add"
      />

      {/* Distribution Details Dialog */}
      {selectedDistribution && (
        <DistributionDetails
          isOpen={!!selectedDistribution}
          onClose={() => setSelectedDistribution(null)}
          distribution={selectedDistribution}
        />
      )}
    </div>
  );
} 