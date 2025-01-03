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
import * as Progress from '@radix-ui/react-progress';
import {
  Plus as PlusIcon,
  AlertCircle as AlertCircleIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';

interface Budget {
  id: number;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: 'on-track' | 'warning' | 'over-budget';
}

interface BudgetManagementProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function BudgetManagement({ transactions }: BudgetManagementProps) {
  const [budgets] = useState<Budget[]>([
    {
      id: 1,
      category: 'Feed & Supplies',
      allocated: 5000.00,
      spent: 3200.00,
      remaining: 1800.00,
      period: 'February 2024',
      status: 'on-track',
    },
    {
      id: 2,
      category: 'Equipment Maintenance',
      allocated: 2000.00,
      spent: 1850.00,
      remaining: 150.00,
      period: 'February 2024',
      status: 'warning',
    },
    {
      id: 3,
      category: 'Veterinary Services',
      allocated: 1500.00,
      spent: 1600.00,
      remaining: -100.00,
      period: 'February 2024',
      status: 'over-budget',
    },
  ]);
  const [isCreatingBudget, setIsCreatingBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const getStatusColor = (status: Budget['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'over-budget':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: Budget['status']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'over-budget':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const calculateProgress = (spent: number, allocated: number) => {
    return Math.min((spent / allocated) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Budget Management</h2>
        <Button
          onClick={() => setIsCreatingBudget(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {budgets.map((budget) => (
          <Card key={budget.id} className="p-4 bg-white">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {budget.category}
                  </h3>
                  <p className="text-sm text-gray-500">{budget.period}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(budget.status)}`}>
                  {budget.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-900">
                    ${budget.spent.toFixed(2)} of ${budget.allocated.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(budget.status)} transition-all duration-300 ease-in-out`}
                    style={{ width: `${calculateProgress(budget.spent, budget.allocated)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Allocated</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${budget.allocated.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${budget.spent.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className={`text-sm font-medium ${budget.remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    ${budget.remaining.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  onClick={() => setSelectedBudget(budget)}
                >
                  View Details
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Budget Dialog */}
      <Dialog 
        open={isCreatingBudget} 
        onOpenChange={setIsCreatingBudget}
      >
        <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white">
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              Set up a new budget for a specific category and period
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="feed-supplies" className="hover:bg-gray-100">Feed & Supplies</SelectItem>
                    <SelectItem value="equipment" className="hover:bg-gray-100">Equipment Maintenance</SelectItem>
                    <SelectItem value="veterinary" className="hover:bg-gray-100">Veterinary Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Period</label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="feb-2024" className="hover:bg-gray-100">February 2024</SelectItem>
                    <SelectItem value="mar-2024" className="hover:bg-gray-100">March 2024</SelectItem>
                    <SelectItem value="apr-2024" className="hover:bg-gray-100">April 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Allocated Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <Input
                type="text"
                placeholder="Add any additional notes"
                className="bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCreatingBudget(false)}
            >
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Create Budget
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Budget Details Dialog */}
      {selectedBudget && (
        <Dialog 
          open={!!selectedBudget} 
          onOpenChange={() => setSelectedBudget(null)}
        >
          <DialogContent className="sm:max-w-[600px] max-w-[95%] w-full bg-white">
            <DialogHeader>
              <DialogTitle>Budget Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedBudget.category}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedBudget.period}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBudget.status)}`}>
                  {selectedBudget.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-900">
                    ${selectedBudget.spent.toFixed(2)} of ${selectedBudget.allocated.toFixed(2)}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(selectedBudget.status)} transition-all duration-300 ease-in-out`}
                    style={{ width: `${calculateProgress(selectedBudget.spent, selectedBudget.allocated)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Allocated</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${selectedBudget.allocated.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spent</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${selectedBudget.spent.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className={`text-sm font-medium ${selectedBudget.remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    ${selectedBudget.remaining.toFixed(2)}
                  </p>
                </div>
              </div>

              {selectedBudget.status === 'warning' || selectedBudget.status === 'over-budget' ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Budget Alert</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        {selectedBudget.status === 'warning'
                          ? 'This budget is close to being exceeded. Consider reviewing expenses or adjusting the allocated amount.'
                          : 'This budget has been exceeded. Immediate attention is required to review and adjust spending.'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedBudget(null)}
              >
                Close
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Adjust Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 