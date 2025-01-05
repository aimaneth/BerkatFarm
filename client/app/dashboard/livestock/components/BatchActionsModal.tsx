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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/Badge';
import {
  Edit,
  Download,
  Trash2,
  MoveRight,
  Syringe,
  Scale,
  Tag,
  MapPin,
  AlertTriangle,
  Calendar,
  Leaf,
  FileText,
  CheckCircle,
  X,
} from 'lucide-react';

interface BatchActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAnimals: Array<{
    tag: string;
    breed: string;
    location: string;
  }>;
}

export function BatchActionsModal({ isOpen, onClose, selectedAnimals }: BatchActionsModalProps) {
  const [showBulkEdit, setShowBulkEdit] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [actionType, setActionType] = React.useState<string>('');
  const [bulkEditData, setBulkEditData] = React.useState({
    location: '',
    weight: '',
    status: '',
    notes: '',
    healthStatus: '',
    feedPlan: '',
    breedingStatus: '',
    vaccinationDate: '',
    treatmentPlan: '',
  });

  const handleBulkEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    // Implement bulk edit logic here
    console.log('Bulk editing animals:', selectedAnimals.length, 'with data:', bulkEditData);
    setShowConfirmation(false);
    setShowBulkEdit(false);
    onClose();
  };

  const handleActionSelect = (action: string) => {
    setActionType(action);
    if (action === 'bulk-edit') {
      setShowBulkEdit(true);
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg max-h-[90vh] overflow-y-auto border bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Batch Actions
          </DialogTitle>
          <DialogDescription>
            Perform actions on {selectedAnimals.length} selected animals
          </DialogDescription>
        </DialogHeader>

        {showConfirmation ? (
          <div className="space-y-4 py-4">
            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-600">Confirm Action</h3>
                  <p className="text-sm text-yellow-600">
                    Are you sure you want to {actionType === 'bulk-edit' ? 'apply these changes' : `perform ${actionType}`} to {selectedAnimals.length} animals?
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Selected Animals</h3>
              <div className="space-y-2">
                {selectedAnimals.slice(0, 3).map((animal) => (
                  <div key={animal.tag} className="flex items-center justify-between">
                    <span className="text-sm">{animal.tag} - {animal.breed}</span>
                    <Badge variant="outline">{animal.location}</Badge>
                  </div>
                ))}
                {selectedAnimals.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    And {selectedAnimals.length - 3} more animals...
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
              <Button onClick={confirmAction} className="w-[200px]">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="w-[200px]"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : !showBulkEdit ? (
          <div className="grid gap-4 py-4">
            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('bulk-edit')}
            >
              <div className="flex items-center gap-3">
                <Edit className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Bulk Edit</h3>
                  <p className="text-sm text-muted-foreground">Update multiple animals at once</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('move')}
            >
              <div className="flex items-center gap-3">
                <MoveRight className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Move Animals</h3>
                  <p className="text-sm text-muted-foreground">Change location for selected animals</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('treatment')}
            >
              <div className="flex items-center gap-3">
                <Syringe className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Schedule Treatment</h3>
                  <p className="text-sm text-muted-foreground">Set vaccination or treatment date</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('weight')}
            >
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Update Weights</h3>
                  <p className="text-sm text-muted-foreground">Record new weights for selected animals</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('feed')}
            >
              <div className="flex items-center gap-3">
                <Leaf className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Update Feed Plan</h3>
                  <p className="text-sm text-muted-foreground">Modify feeding schedule and diet</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('export')}
            >
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5" />
                <div className="flex-1">
                  <h3 className="font-medium">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Download data for selected animals</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleActionSelect('delete')}
            >
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-500">Delete Animals</h3>
                  <p className="text-sm text-muted-foreground">Remove selected animals</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <form onSubmit={handleBulkEdit} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select
                    value={bulkEditData.location}
                    onValueChange={(value) => setBulkEditData({ ...bulkEditData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
                      <SelectItem value="pen-a">Pen A</SelectItem>
                      <SelectItem value="pen-b">Pen B</SelectItem>
                      <SelectItem value="pen-c">Pen C</SelectItem>
                      <SelectItem value="quarantine">Quarantine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Health Status</label>
                  <Select
                    value={bulkEditData.healthStatus}
                    onValueChange={(value) => setBulkEditData({ ...bulkEditData, healthStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
                      <SelectItem value="healthy">Healthy</SelectItem>
                      <SelectItem value="sick">Sick</SelectItem>
                      <SelectItem value="treatment">Under Treatment</SelectItem>
                      <SelectItem value="quarantine">Quarantined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feed Plan</label>
                  <Select
                    value={bulkEditData.feedPlan}
                    onValueChange={(value) => setBulkEditData({ ...bulkEditData, feedPlan: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select feed plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
                      <SelectItem value="standard">Standard Diet</SelectItem>
                      <SelectItem value="intensive">Intensive Growth</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="special">Special Diet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input
                    type="number"
                    value={bulkEditData.weight}
                    onChange={(e) => setBulkEditData({ ...bulkEditData, weight: e.target.value })}
                    placeholder="Enter weight"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Breeding Status</label>
                  <Select
                    value={bulkEditData.breedingStatus}
                    onValueChange={(value) => setBulkEditData({ ...bulkEditData, breedingStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
                      <SelectItem value="ready">Ready for Breeding</SelectItem>
                      <SelectItem value="pregnant">Pregnant</SelectItem>
                      <SelectItem value="lactating">Lactating</SelectItem>
                      <SelectItem value="resting">Resting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Next Vaccination</label>
                  <Input
                    type="date"
                    value={bulkEditData.vaccinationDate}
                    onChange={(e) => setBulkEditData({ ...bulkEditData, vaccinationDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Treatment Plan</label>
                <Select
                  value={bulkEditData.treatmentPlan}
                  onValueChange={(value) => setBulkEditData({ ...bulkEditData, treatmentPlan: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select treatment plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-900 border shadow-md">
                    <SelectItem value="none">No Treatment</SelectItem>
                    <SelectItem value="antibiotics">Antibiotics Course</SelectItem>
                    <SelectItem value="vitamins">Vitamin Supplements</SelectItem>
                    <SelectItem value="deworming">Deworming Treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input
                  value={bulkEditData.notes}
                  onChange={(e) => setBulkEditData({ ...bulkEditData, notes: e.target.value })}
                  placeholder="Add notes to all selected"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6 border-t pt-6">
              <Button type="submit" className="w-[200px]">Apply Changes</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBulkEdit(false)}
                className="w-[200px]"
              >
                Back
              </Button>
            </div>
          </form>
        )}

        {!showBulkEdit && !showConfirmation && (
          <div className="flex flex-col items-center gap-0 mt-0 border-t pt-0">
            <Button variant="outline" onClick={onClose} className="w-[200px]">
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 