import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import {
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  Star as StarIcon,
  Upload as UploadIcon,
  Building as BuildingIcon,
  Calendar as CalendarIcon,
  Briefcase as BriefcaseIcon,
  X as XIcon
} from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface FormErrors {
  [key: string]: string;
}

export function AddMemberModal({ isOpen, onClose, onSubmit }: AddMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    department: '',
    shift: '',
    startDate: '',
    specializations: '',
    avatar: null as File | null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.shift) newErrors.shift = 'Shift is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, avatar: e.target.files![0] }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-white p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add New Team Member
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the information below to add a new team member to your organization.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
              {formData.avatar ? (
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="Avatar preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-12 w-12 text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <UploadIcon className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Profile Photo</h4>
              <p className="text-xs text-gray-500">
                Upload a professional photo (max 5MB)
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                    placeholder="John Smith"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BuildingIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    value={formData.department}
                    onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.department ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                  >
                    <option value="">Select Department</option>
                    <option value="Management">Management</option>
                    <option value="Veterinary">Veterinary</option>
                    <option value="Feed & Nutrition">Feed & Nutrition</option>
                    <option value="Operations">Operations</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-xs text-red-500">{errors.department}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    value={formData.role}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.role ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                  >
                    <option value="">Select Role</option>
                    <option value="Farm Manager">Farm Manager</option>
                    <option value="Veterinarian">Veterinarian</option>
                    <option value="Feed Specialist">Feed Specialist</option>
                    <option value="Animal Caretaker">Animal Caretaker</option>
                    <option value="Maintenance Staff">Maintenance Staff</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.phone ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                    placeholder="+1234567890"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className={`pl-10 block w-full border ${errors.location ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                    placeholder="North Wing"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  required
                  value={formData.shift}
                  onChange={e => setFormData(prev => ({ ...prev, shift: e.target.value }))}
                  className={`pl-10 block w-full border ${errors.shift ? 'border-red-300' : 'border-gray-300'} 
                  rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning (6 AM - 2 PM)</option>
                  <option value="Afternoon">Afternoon (2 PM - 10 PM)</option>
                  <option value="Night">Night (10 PM - 6 AM)</option>
                  <option value="Rotating">Rotating</option>
                </select>
                {errors.shift && (
                  <p className="mt-1 text-xs text-red-500">{errors.shift}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className={`pl-10 block w-full border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} 
                  rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm py-2`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specializations
            </label>
            <div className="mt-1">
              <textarea
                value={formData.specializations}
                onChange={e => setFormData(prev => ({ ...prev, specializations: e.target.value }))}
                rows={2}
                className="shadow-sm block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm p-3"
                placeholder="Enter specializations (e.g., Cattle Management, Team Leadership)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate multiple specializations with commas
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-sm py-2 px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-2 px-4"
            >
              {isSubmitting ? 'Adding...' : 'Add Team Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 