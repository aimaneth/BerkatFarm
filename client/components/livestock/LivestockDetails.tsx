import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import {
  Calendar,
  MapPin,
  Tag,
  Info,
  Activity,
  DollarSign,
  FileText,
  Printer,
  Download,
} from 'lucide-react';

interface LivestockDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: number;
    tag: string;
    type: string;
    breed: string;
    status: string;
    age: string;
    weight: string;
    location: string;
    lastCheckup: string;
    nextCheckup: string;
    purchaseDate?: string;
    purchasePrice?: string;
    notes?: string;
  };
}

export function LivestockDetails({ isOpen, onClose, data }: LivestockDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-2 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">{data.tag}</DialogTitle>
              <DialogDescription className="text-gray-500">
                Livestock Details
              </DialogDescription>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              data.status === 'Healthy'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {data.status}
            </span>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="text-sm text-gray-900">{data.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Breed</p>
                <p className="text-sm text-gray-900">{data.breed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Age</p>
                <p className="text-sm text-gray-900">{data.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Weight</p>
                <p className="text-sm text-gray-900">{data.weight}</p>
              </div>
            </div>
          </div>

          {/* Location & Checkups */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Location & Health</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm text-gray-900">{data.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Checkup</p>
                <p className="text-sm text-gray-900">{data.lastCheckup}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Next Checkup</p>
                <p className="text-sm text-gray-900">{data.nextCheckup}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(data.purchaseDate || data.purchasePrice || data.notes) && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Information</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.purchaseDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Purchase Date</p>
                    <p className="text-sm text-gray-900">{data.purchaseDate}</p>
                  </div>
                )}
                {data.purchasePrice && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Purchase Price</p>
                    <p className="text-sm text-gray-900">{data.purchasePrice}</p>
                  </div>
                )}
                {data.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{data.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 