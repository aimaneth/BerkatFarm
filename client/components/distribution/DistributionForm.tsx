'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const distributionSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  product: z.string().min(1, 'Product is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  customer: z.string().min(1, 'Customer is required'),
  destination: z.string().min(1, 'Destination is required'),
  deliveryDate: z.string().min(1, 'Delivery date is required'),
  driver: z.string().min(1, 'Driver is required'),
  vehicle: z.string().min(1, 'Vehicle is required'),
  price: z.string().min(1, 'Price is required'),
  status: z.string().min(1, 'Status is required'),
});

type DistributionFormData = z.infer<typeof distributionSchema>;

interface DistributionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DistributionFormData) => void;
  initialData?: Partial<DistributionFormData>;
  mode: 'add' | 'edit';
}

const products = [
  'Fresh Milk',
  'Organic Eggs',
  'Cheese',
  'Yogurt',
  'Butter',
];

const vehicles = [
  'Truck-01',
  'Truck-02',
  'Van-01',
  'Van-02',
  'Van-03',
];

const drivers = [
  'John Smith',
  'Mike Johnson',
  'Sarah Wilson',
  'David Brown',
  'Emma Davis',
];

const statuses = [
  'pending',
  'in-transit',
  'delivered',
];

export function DistributionForm({ isOpen, onClose, onSubmit, initialData, mode }: DistributionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DistributionFormData>({
    resolver: zodResolver(distributionSchema),
    defaultValues: initialData || {
      orderNumber: '',
      product: '',
      quantity: '',
      customer: '',
      destination: '',
      deliveryDate: new Date().toISOString().split('T')[0],
      driver: '',
      vehicle: '',
      price: '',
      status: 'pending',
    },
  });

  const onSubmitForm = async (data: DistributionFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>
            {mode === 'add' ? 'New Distribution Order' : 'Edit Distribution Order'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a new distribution order'
              : 'Update the distribution order details'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Number</label>
              <Input
                {...register('orderNumber')}
                placeholder="Enter order number"
                className={errors.orderNumber ? 'border-red-500' : ''}
              />
              {errors.orderNumber && (
                <p className="text-xs text-red-500">{errors.orderNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product</label>
              <Select
                value={initialData?.product || ''}
                onValueChange={(value) => setValue('product', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {products.map((product) => (
                    <SelectItem key={product} value={product} className="hover:bg-gray-100">
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.product && (
                <p className="text-xs text-red-500">{errors.product.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <Input
                {...register('quantity')}
                placeholder="Enter quantity"
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && (
                <p className="text-xs text-red-500">{errors.quantity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price</label>
              <Input
                {...register('price')}
                placeholder="Enter price"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Customer</label>
              <Input
                {...register('customer')}
                placeholder="Enter customer name"
                className={errors.customer ? 'border-red-500' : ''}
              />
              {errors.customer && (
                <p className="text-xs text-red-500">{errors.customer.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Destination</label>
              <Input
                {...register('destination')}
                placeholder="Enter destination"
                className={errors.destination ? 'border-red-500' : ''}
              />
              {errors.destination && (
                <p className="text-xs text-red-500">{errors.destination.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Delivery Date</label>
              <Input
                type="date"
                {...register('deliveryDate')}
                className={errors.deliveryDate ? 'border-red-500' : ''}
              />
              {errors.deliveryDate && (
                <p className="text-xs text-red-500">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={initialData?.status || 'pending'}
                onValueChange={(value) => setValue('status', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="hover:bg-gray-100">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Driver</label>
              <Select
                value={initialData?.driver || ''}
                onValueChange={(value) => setValue('driver', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {drivers.map((driver) => (
                    <SelectItem key={driver} value={driver} className="hover:bg-gray-100">
                      {driver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.driver && (
                <p className="text-xs text-red-500">{errors.driver.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Vehicle</label>
              <Select
                value={initialData?.vehicle || ''}
                onValueChange={(value) => setValue('vehicle', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle} value={vehicle} className="hover:bg-gray-100">
                      {vehicle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicle && (
                <p className="text-xs text-red-500">{errors.vehicle.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {mode === 'add' ? 'Creating...' : 'Updating...'}
                </div>
              ) : (
                mode === 'add' ? 'Create Order' : 'Update Order'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 