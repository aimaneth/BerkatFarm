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

const transactionSchema = z.object({
  type: z.string().min(1, 'Transaction type is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.string().min(1, 'Amount is required'),
  date: z.string().min(1, 'Date is required'),
  reference: z.string().min(1, 'Reference number is required'),
  status: z.string().min(1, 'Status is required'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  initialData?: Partial<TransactionFormData>;
  mode: 'add' | 'edit';
}

const categories = {
  income: [
    'Sales',
    'Services',
    'Investments',
    'Grants',
    'Other Income',
  ],
  expense: [
    'Feed',
    'Veterinary',
    'Labor',
    'Equipment',
    'Utilities',
    'Maintenance',
    'Transportation',
    'Other Expenses',
  ],
};

const statuses = [
  'pending',
  'completed',
];

export function TransactionForm({ isOpen, onClose, onSubmit, initialData, mode }: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(initialData?.type || 'income');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData || {
      type: 'income',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      reference: '',
      status: 'pending',
    },
  });

  const onSubmitForm = async (data: TransactionFormData) => {
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
            {mode === 'add' ? 'New Transaction' : 'Edit Transaction'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Create a new financial transaction'
              : 'Update the transaction details'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value);
                  setValue('type', value);
                  setValue('category', ''); // Reset category when type changes
                }}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="income" className="hover:bg-gray-100">Income</SelectItem>
                  <SelectItem value="expense" className="hover:bg-gray-100">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select
                value={initialData?.category || ''}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories[selectedType as keyof typeof categories].map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-gray-100">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Reference Number</label>
              <Input
                {...register('reference')}
                placeholder="Enter reference number"
                className={errors.reference ? 'border-red-500' : ''}
              />
              {errors.reference && (
                <p className="text-xs text-red-500">{errors.reference.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <Input
                {...register('amount')}
                type="number"
                step="0.01"
                placeholder="Enter amount"
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                {...register('date')}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-xs text-red-500">{errors.date.message}</p>
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

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                {...register('description')}
                placeholder="Enter description"
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description.message}</p>
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
                mode === 'add' ? 'Create Transaction' : 'Update Transaction'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 