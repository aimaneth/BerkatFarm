'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus as PlusIcon, X as XIcon } from 'lucide-react';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface OrderDelivery {
  address: string;
  destination: string;
  driver: string;
  vehicle: string;
  scheduledDate: string;
  notes: string;
}

interface OrderFormData {
  customer: string;
  items: OrderItem[];
  delivery: OrderDelivery;
  notes: string;
  status: string;
  paymentStatus: string;
}

interface OrderFormProps {
  initialData?: OrderFormData;
  onSubmit: (data: OrderFormData) => void;
  onCancel: () => void;
}

export function OrderForm({ initialData, onSubmit, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customer: initialData?.customer || '',
    items: initialData?.items || [{ productId: '', quantity: 1 }],
    delivery: {
      address: initialData?.delivery?.address || '',
      destination: initialData?.delivery?.destination || '',
      driver: initialData?.delivery?.driver || '',
      vehicle: initialData?.delivery?.vehicle || '',
      scheduledDate: initialData?.delivery?.scheduledDate || '',
      notes: initialData?.delivery?.notes || ''
    },
    notes: initialData?.notes || '',
    status: initialData?.status || 'draft',
    paymentStatus: initialData?.paymentStatus || 'pending'
  });

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Customer Information</h3>
        <Input
          placeholder="Customer name or business"
          value={formData.customer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setFormData({ ...formData, customer: e.target.value })}
          className="bg-white"
        />
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Order Items</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <Select
                  value={item.productId}
                  onValueChange={(value) => {
                    const newItems = [...formData.items];
                    newItems[index].productId = value;
                    setFormData({ ...formData, items: newItems });
                  }}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="milk-1">Fresh Whole Milk (1L)</SelectItem>
                    <SelectItem value="milk-2">Low Fat Milk (1L)</SelectItem>
                    <SelectItem value="beef-1">Premium Beef Cuts (1kg)</SelectItem>
                    <SelectItem value="beef-2">Ground Beef (1kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newItems = [...formData.items];
                    newItems[index].quantity = parseInt(e.target.value);
                    setFormData({ ...formData, items: newItems });
                  }}
                  className="bg-white"
                />
              </div>
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                  className="flex-shrink-0"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Delivery Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Delivery address"
            value={formData.delivery.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, address: e.target.value }
            })}
            className="bg-white"
          />
          <Input
            placeholder="Destination/Branch"
            value={formData.delivery.destination}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, destination: e.target.value }
            })}
            className="bg-white"
          />
          <Input
            placeholder="Driver name"
            value={formData.delivery.driver}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, driver: e.target.value }
            })}
            className="bg-white"
          />
          <Input
            placeholder="Vehicle"
            value={formData.delivery.vehicle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, vehicle: e.target.value }
            })}
            className="bg-white"
          />
          <Input
            type="date"
            value={formData.delivery.scheduledDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, scheduledDate: e.target.value }
            })}
            className="bg-white"
          />
          <Textarea
            placeholder="Delivery notes"
            value={formData.delivery.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({
              ...formData,
              delivery: { ...formData.delivery, notes: e.target.value }
            })}
            className="bg-white"
          />
        </div>
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Order Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Payment Status</label>
          <Select
            value={formData.paymentStatus}
            onValueChange={(value) => setFormData({ ...formData, paymentStatus: value })}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Order Notes</label>
        <Textarea
          placeholder="Additional notes about the order"
          value={formData.notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
          className="bg-white"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {initialData ? 'Update Order' : 'Create Order'}
        </Button>
      </div>
    </form>
  );
} 