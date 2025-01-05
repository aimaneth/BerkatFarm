'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import { Edit, Tag, Scale, MapPin } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: {
    tag: string;
    breed: string;
    age: string;
    weight: string;
    location: string;
    notes: string;
  } | null;
}

export function EditModal({ isOpen, onClose, animal }: EditModalProps) {
  if (!animal) return null;

  const [formData, setFormData] = React.useState({
    tag: animal.tag,
    breed: animal.breed,
    age: animal.age,
    weight: animal.weight,
    location: animal.location,
    notes: animal.notes,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save logic here
    console.log('Saving animal details:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Animal Details
          </DialogTitle>
          <DialogDescription>
            Update information for {animal.tag}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tag Number</label>
                <Input
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Enter tag number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Breed</label>
                <Input
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="Enter breed"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter age"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight</label>
                <Input
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="Enter weight"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Input
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter notes"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
            <Button type="submit" className="w-[200px]">Save Changes</Button>
            <Button type="button" variant="outline" onClick={onClose} className="w-[200px]">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 