'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Livestock } from '@/services/livestock';

const livestockSchema = z.object({
  tag: z.string().min(1, 'Tag is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().min(1, 'Breed is required'),
  status: z.string().min(1, 'Status is required'),
  age: z.string().min(1, 'Age is required'),
  weight: z.string().min(1, 'Weight is required'),
  location: z.string().min(1, 'Location is required'),
  lastCheckup: z.string().min(1, 'Last checkup date is required'),
  nextCheckup: z.string().min(1, 'Next checkup date is required'),
  purchaseDate: z.string().optional(),
  purchasePrice: z.string().optional(),
  notes: z.string().optional(),
});

type LivestockFormData = z.infer<typeof livestockSchema>;

interface LivestockFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LivestockFormData) => void;
  initialData?: Partial<Livestock>;
  mode: 'add' | 'edit';
}

const animalTypes = [
  'Dairy Cow',
  'Beef Cattle',
  'Calf',
  'Bull',
  'Heifer',
];

const statusOptions = [
  'Healthy',
  'Under Treatment',
  'Pregnant',
  'In Heat',
  'Quarantined',
];

const locations = [
  'Pen A',
  'Pen B',
  'Pen C',
  'Field A',
  'Field B',
  'Barn',
];

export function LivestockForm({ isOpen, onClose, onSubmit, initialData, mode }: LivestockFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LivestockFormData>({
    resolver: zodResolver(livestockSchema),
    defaultValues: initialData || {
      tag: '',
      type: '',
      breed: '',
      status: 'Healthy',
      age: '',
      weight: '',
      location: '',
      lastCheckup: new Date().toISOString().split('T')[0],
      nextCheckup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const onSubmitForm = async (data: LivestockFormData) => {
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
            {mode === 'add' ? 'Add New Animal' : 'Edit Animal'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Add a new animal to your livestock inventory'
              : 'Update the animal information'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tag Number</label>
              <Input
                {...register('tag')}
                placeholder="Enter tag number"
                className={errors.tag ? 'border-red-500' : ''}
              />
              {errors.tag && (
                <p className="text-xs text-red-500">{errors.tag.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select
                value={initialData?.type || ''}
                onValueChange={(value) => setValue('type', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {animalTypes.map((type) => (
                    <SelectItem key={type} value={type} className="hover:bg-gray-100">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Breed</label>
              <Input
                {...register('breed')}
                placeholder="Enter breed"
                className={errors.breed ? 'border-red-500' : ''}
              />
              {errors.breed && (
                <p className="text-xs text-red-500">{errors.breed.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={initialData?.status || 'Healthy'}
                onValueChange={(value) => setValue('status', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} className="hover:bg-gray-100">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <Input
                {...register('age')}
                placeholder="Enter age"
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && (
                <p className="text-xs text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Weight</label>
              <Input
                {...register('weight')}
                placeholder="Enter weight"
                className={errors.weight ? 'border-red-500' : ''}
              />
              {errors.weight && (
                <p className="text-xs text-red-500">{errors.weight.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Select
                value={initialData?.location || ''}
                onValueChange={(value) => setValue('location', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="hover:bg-gray-100">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-xs text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Checkup</label>
              <Input
                type="date"
                {...register('lastCheckup')}
                className={errors.lastCheckup ? 'border-red-500' : ''}
              />
              {errors.lastCheckup && (
                <p className="text-xs text-red-500">{errors.lastCheckup.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Next Checkup</label>
              <Input
                type="date"
                {...register('nextCheckup')}
                className={errors.nextCheckup ? 'border-red-500' : ''}
              />
              {errors.nextCheckup && (
                <p className="text-xs text-red-500">{errors.nextCheckup.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Purchase Date</label>
              <Input
                type="date"
                {...register('purchaseDate')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Purchase Price</label>
              <Input
                {...register('purchasePrice')}
                placeholder="Enter purchase price"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              {...register('notes')}
              className="w-full min-h-[80px] p-2 border rounded-md resize-y bg-white"
              placeholder="Enter any additional notes..."
            />
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
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </div>
              ) : (
                mode === 'add' ? 'Add Animal' : 'Update Animal'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 