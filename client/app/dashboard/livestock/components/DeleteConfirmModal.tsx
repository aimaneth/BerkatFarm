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
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  animal: {
    tag: string;
    breed: string;
  } | null;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, animal }: DeleteConfirmModalProps) {
  if (!animal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {animal.tag} ({animal.breed})? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
          <Button 
            className="w-[200px] bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete Animal
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-[200px]"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 