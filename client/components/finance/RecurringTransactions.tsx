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
  Calendar as CalendarIcon,
  Bell as BellIcon,
  RefreshCw as RefreshIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
} from 'lucide-react';

interface RecurringTransaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  category: string;
  status: 'active' | 'paused';
}

interface RecurringTransactionsProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function RecurringTransactions({ transactions }: RecurringTransactionsProps) {
  const [recurringTransactions] = useState<RecurringTransaction[]>([
    {
      id: 1,
      description: 'Monthly Feed Supply',
      amount: 2500.00,
      type: 'expense',
      frequency: 'monthly',
      nextDate: '2024-03-01',
      category: 'Feed & Supplies',
      status: 'active',
    },
    {
      id: 2,
      description: 'Weekly Milk Sales',
      amount: 1200.00,
      type: 'income',
      frequency: 'weekly',
      nextDate: '2024-02-27',
      category: 'Sales',
      status: 'active',
    },
  ]);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const getFrequencyLabel = (frequency: RecurringTransaction['frequency']) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'yearly': return 'Yearly';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recurring Transactions</h2>
        <Button
          onClick={() => setIsAddingTransaction(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Recurring Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recurringTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-4 bg-white">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    <RefreshIcon className={`h-5 w-5 ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {transaction.description}
                    </h3>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className={`text-sm font-medium ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="text-sm font-medium text-gray-900">
                      {getFrequencyLabel(transaction.frequency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Date</p>
                    <p className="text-sm font-medium text-gray-900">{transaction.nextDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white"
                >
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Recurring Transaction Dialog */}
      <Dialog 
        open={isAddingTransaction} 
        onOpenChange={setIsAddingTransaction}
      >
        <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white">
          <DialogHeader>
            <DialogTitle>Add Recurring Transaction</DialogTitle>
            <DialogDescription>
              Set up a new recurring transaction
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="income" className="hover:bg-gray-100">Income</SelectItem>
                    <SelectItem value="expense" className="hover:bg-gray-100">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="feed-supplies" className="hover:bg-gray-100">Feed & Supplies</SelectItem>
                    <SelectItem value="sales" className="hover:bg-gray-100">Sales</SelectItem>
                    <SelectItem value="veterinary" className="hover:bg-gray-100">Veterinary Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                type="text"
                placeholder="Enter description"
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Frequency</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="daily" className="hover:bg-gray-100">Daily</SelectItem>
                    <SelectItem value="weekly" className="hover:bg-gray-100">Weekly</SelectItem>
                    <SelectItem value="monthly" className="hover:bg-gray-100">Monthly</SelectItem>
                    <SelectItem value="yearly" className="hover:bg-gray-100">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <Input
                type="date"
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAddingTransaction(false)}
            >
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Recurring Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 