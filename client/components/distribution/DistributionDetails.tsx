'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button';
import {
  Printer as PrinterIcon,
  Download as DownloadIcon,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Truck as TruckIcon,
} from 'lucide-react';

interface DistributionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  distribution: {
    id: number;
    orderNumber: string;
    product: string;
    quantity: string;
    customer: string;
    destination: string;
    status: string;
    deliveryDate: string;
    driver: string;
    vehicle: string;
    price: string;
  };
}

export function DistributionDetails({ isOpen, onClose, distribution }: DistributionDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-2 flex flex-row justify-between items-start">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Order {distribution.orderNumber}
            </DialogTitle>
            <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(distribution.status)}`}>
              {distribution.status.charAt(0).toUpperCase() + distribution.status.slice(1)}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <PrinterIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Product Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Product Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Product</p>
                <p className="text-sm font-medium text-gray-900">{distribution.product}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="text-sm font-medium text-gray-900">{distribution.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-sm font-medium text-gray-900">{distribution.price}</p>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Delivery Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="text-sm font-medium text-gray-900">{distribution.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Date</p>
                  <p className="text-sm font-medium text-gray-900">{distribution.deliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="text-sm font-medium text-gray-900">{distribution.customer}</p>
              </div>
            </div>
          </div>

          {/* Transport Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Transport Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <TruckIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="text-sm font-medium text-gray-900">{distribution.vehicle}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Driver</p>
                  <p className="text-sm font-medium text-gray-900">{distribution.driver}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 