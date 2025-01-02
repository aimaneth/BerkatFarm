'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { IDistribution, ILivestock } from '@/shared/types/models';

const distributionSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  customer: z.object({
    name: z.string().min(1, 'Customer name is required'),
    contact: z.string().min(1, 'Contact is required'),
    address: z.string().min(1, 'Address is required'),
  }),
  items: z.array(z.object({
    livestock: z.string().min(1, 'Livestock is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be at least 0'),
  })),
  totalAmount: z.number().min(0, 'Total amount must be at least 0'),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  paymentStatus: z.enum(['pending', 'paid', 'refunded']),
  deliveryDate: z.date(),
  trackingInfo: z.object({
    carrier: z.string(),
    trackingNumber: z.string(),
    location: z.string(),
  }),
});

type DistributionFormData = z.infer<typeof distributionSchema>;

interface DistributionFormProps {
  initialData?: IDistribution;
  onSubmit: (data: DistributionFormData) => Promise<void>;
  livestock: ILivestock[];
}

export function DistributionForm({ initialData, onSubmit, livestock }: DistributionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DistributionFormData>({
    resolver: zodResolver(distributionSchema),
    defaultValues: initialData || {
      orderId: '',
      customer: {
        name: '',
        contact: '',
        address: '',
      },
      items: [{
        livestock: '',
        quantity: 1,
        price: 0,
      }],
      totalAmount: 0,
      status: 'pending',
      paymentStatus: 'pending',
      deliveryDate: new Date(),
      trackingInfo: {
        carrier: '',
        trackingNumber: '',
        location: '',
      },
    },
  });

  const handleFormSubmit = async (data: DistributionFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Form fields */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Distribution'}
      </Button>
    </form>
  );
} 