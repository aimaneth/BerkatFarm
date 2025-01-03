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
  Calendar as CalendarIcon,
  DollarSign as DollarSignIcon,
  Tag as TagIcon,
  FileText as FileTextIcon,
} from 'lucide-react';

interface TransactionDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: number;
    type: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    status: string;
    reference: string;
  };
}

export function TransactionDetails({ isOpen, onClose, transaction }: TransactionDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white p-0 gap-0">
        <DialogHeader className="p-6 pb-2 flex flex-row justify-between items-start">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Transaction Details
            </DialogTitle>
            <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <FileTextIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Reference Number</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.reference}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TagIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.category}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-900">{transaction.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Financial Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <DollarSignIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className={`text-lg font-semibold ${getTypeColor(transaction.type)}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="text-sm text-gray-900">{transaction.description}</p>
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
            {transaction.status === 'pending' && (
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Update Status
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 