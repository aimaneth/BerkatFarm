'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import type { ITeamMember } from '@/shared/types/models';

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'manager', 'staff']),
  department: z.string().min(1, 'Department is required'),
  contact: z.string().min(1, 'Contact is required'),
  status: z.enum(['active', 'inactive']),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamFormProps {
  initialData?: ITeamMember;
  onSubmit: (data: TeamMemberFormData) => Promise<void>;
}

export function TeamForm({ initialData, onSubmit }: TeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: 'staff',
      department: '',
      contact: '',
      status: 'active',
    },
  });

  const handleFormSubmit = async (data: TeamMemberFormData) => {
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
          {...register('name')}
          placeholder="Name"
          error={errors.name?.message}
        />
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          error={errors.email?.message}
        />
        <Input
          {...register('department')}
          placeholder="Department"
          error={errors.department?.message}
        />
        <Input
          {...register('contact')}
          placeholder="Contact"
          error={errors.contact?.message}
        />
        <select
          {...register('role')}
          className="w-full rounded-md border border-gray-200 p-2"
        >
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select
          {...register('status')}
          className="w-full rounded-md border border-gray-200 p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Team Member'}
      </Button>
    </form>
  );
} 