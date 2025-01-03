'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
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
import {
  Plus as PlusIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Printer as PrinterIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from 'lucide-react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  customer: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

interface InvoiceManagementProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function InvoiceManagement({ transactions }: InvoiceManagementProps) {
  const [invoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      customer: 'Metro Mart',
      amount: 2500.00,
      date: '2024-02-20',
      dueDate: '2024-03-20',
      status: 'paid',
      items: [
        {
          description: 'Fresh Milk',
          quantity: 500,
          unitPrice: 5.00,
          total: 2500.00,
        },
      ],
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      customer: 'Local Store',
      amount: 800.00,
      date: '2024-02-18',
      dueDate: '2024-03-18',
      status: 'pending',
      items: [
        {
          description: 'Organic Eggs',
          quantity: 200,
          unitPrice: 4.00,
          total: 800.00,
        },
      ],
    },
  ]);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <AlertCircleIcon className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Invoice Management</h2>
        <Button
          onClick={() => setIsCreatingInvoice(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="p-4 bg-white">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </h3>
                      <p className="text-sm text-gray-500">{invoice.customer}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Invoice Date</p>
                    <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-sm font-medium text-gray-900">{invoice.dueDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                >
                  <PrinterIcon className="h-4 w-4 mr-2" />
                  Print
                </Button>
                {invoice.status === 'pending' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white text-blue-600 hover:text-blue-700"
                  >
                    <SendIcon className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Invoice Dialog */}
      <Dialog 
        open={isCreatingInvoice} 
        onOpenChange={setIsCreatingInvoice}
      >
        <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for your customers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Customer</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="metro-mart" className="hover:bg-gray-100">Metro Mart</SelectItem>
                    <SelectItem value="local-store" className="hover:bg-gray-100">Local Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <Input
                  type="date"
                  className="bg-white"
                />
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Invoice Items</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3">
                        <Input className="bg-white" placeholder="Enter description" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" className="bg-white" placeholder="0" />
                      </td>
                      <td className="px-4 py-3">
                        <Input type="number" className="bg-white" placeholder="0.00" />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">$0.00</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$0.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCreatingInvoice(false)}
            >
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog 
          open={!!selectedInvoice} 
          onOpenChange={() => setSelectedInvoice(null)}
        >
          <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white">
            <DialogHeader>
              <DialogTitle>Invoice Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedInvoice.invoiceNumber}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedInvoice.customer}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${selectedInvoice.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Invoice Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedInvoice.dueDate}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${selectedInvoice.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedInvoice(null)}
              >
                Close
              </Button>
              <Button 
                variant="outline"
                className="bg-white"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button 
                variant="outline"
                className="bg-white"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 