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

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  department: z.string().min(1, 'Department is required'),
  shift: z.string().min(1, 'Shift is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  status: z.string().min(1, 'Status is required'),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeamMemberFormData) => void;
  initialData?: Partial<TeamMemberFormData>;
  mode: 'add' | 'edit';
}

const departments = [
  'Management',
  'Veterinary',
  'Feed & Nutrition',
  'Operations',
];

const shifts = [
  'Morning',
  'Afternoon',
  'Night',
];

const statuses = [
  'active',
  'on-leave',
];

export function TeamForm({ isOpen, onClose, onSubmit, initialData, mode }: TeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: initialData || {
      name: '',
      role: '',
      department: '',
      shift: '',
      email: '',
      phone: '',
      status: 'active',
    },
  });

  const onSubmitForm = async (data: TeamMemberFormData) => {
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
            {mode === 'add' ? 'Add New Team Member' : 'Edit Team Member'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Add a new member to your team'
              : 'Update the team member information'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input
                {...register('name')}
                placeholder="Enter full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Input
                {...register('role')}
                placeholder="Enter role"
                className={errors.role ? 'border-red-500' : ''}
              />
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select
                value={initialData?.department || ''}
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept} className="hover:bg-gray-100">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && (
                <p className="text-xs text-red-500">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Shift</label>
              <Select
                value={initialData?.shift || ''}
                onValueChange={(value) => setValue('shift', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {shifts.map((shift) => (
                    <SelectItem key={shift} value={shift} className="hover:bg-gray-100">
                      {shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.shift && (
                <p className="text-xs text-red-500">{errors.shift.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                {...register('email')}
                placeholder="Enter email address"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <Input
                {...register('phone')}
                placeholder="Enter phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={initialData?.status || 'active'}
                onValueChange={(value) => setValue('status', value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status} className="hover:bg-gray-100">
                      {status === 'active' ? 'Active' : 'On Leave'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
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
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </div>
              ) : (
                mode === 'add' ? 'Add Member' : 'Update Member'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 