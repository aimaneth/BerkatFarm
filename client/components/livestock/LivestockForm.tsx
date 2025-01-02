'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import type { ILivestock } from '@/shared/types/models';

const livestockSchema = z.object({
  tag: z.string().min(1, 'Tag is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().min(1, 'Breed is required'),
  birthDate: z.date(),
  gender: z.enum(['male', 'female']),
  weight: z.number().min(0, 'Weight must be at least 0'),
  status: z.enum(['healthy', 'sick', 'quarantined', 'deceased']),
  location: z.string().min(1, 'Location is required'),
  notes: z.string().optional(),
});

type LivestockFormData = z.infer<typeof livestockSchema>;

interface LivestockFormProps {
  initialData?: ILivestock;
  onSubmit: (data: LivestockFormData) => Promise<void>;
}

export function LivestockForm({ initialData, onSubmit }: LivestockFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LivestockFormData>({
    resolver: zodResolver(livestockSchema),
    defaultValues: initialData || {
      tag: '',
      type: '',
      breed: '',
      birthDate: new Date(),
      gender: 'male',
      weight: 0,
      status: 'healthy',
      location: '',
      notes: '',
    },
  });

  const handleFormSubmit = async (data: LivestockFormData) => {
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
      <div className="space-y-4">
        <Input
          {...register('tag')}
          placeholder="Tag"
          error={errors.tag?.message}
        />
        <Input
          {...register('type')}
          placeholder="Type"
          error={errors.type?.message}
        />
        <Input
          {...register('breed')}
          placeholder="Breed"
          error={errors.breed?.message}
        />
        <Input
          {...register('birthDate')}
          type="date"
          error={errors.birthDate?.message}
        />
        <select
          {...register('gender')}
          className="w-full rounded-md border border-gray-200 p-2"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Input
          {...register('weight', { valueAsNumber: true })}
          type="number"
          placeholder="Weight (kg)"
          error={errors.weight?.message}
        />
        <select
          {...register('status')}
          className="w-full rounded-md border border-gray-200 p-2"
        >
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="quarantined">Quarantined</option>
          <option value="deceased">Deceased</option>
        </select>
        <Input
          {...register('location')}
          placeholder="Location"
          error={errors.location?.message}
        />
        <textarea
          {...register('notes')}
          placeholder="Notes"
          className="w-full rounded-md border border-gray-200 p-2"
          rows={3}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Livestock'}
      </Button>
    </form>
  );
} 