'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download as DownloadIcon,
  FileText as FileTextIcon,
  Calculator as CalculatorIcon,
  Receipt as ReceiptIcon,
  PieChart as PieChartIcon,
} from 'lucide-react';

interface TaxManagementProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function TaxManagement({ transactions }: TaxManagementProps) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  const taxSummary = {
    totalIncome: 25000.00,
    totalExpenses: 18500.00,
    taxableIncome: 6500.00,
    estimatedTax: 1300.00,
    deductions: 3500.00,
  };

  const deductibleExpenses = [
    {
      category: 'Feed & Supplies',
      amount: 8500.00,
      percentage: 45,
    },
    {
      category: 'Equipment Maintenance',
      amount: 4200.00,
      percentage: 23,
    },
    {
      category: 'Veterinary Services',
      amount: 3100.00,
      percentage: 17,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Tax Management</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="2024" className="hover:bg-gray-100">2024</SelectItem>
              <SelectItem value="2023" className="hover:bg-gray-100">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Q1" className="hover:bg-gray-100">Q1</SelectItem>
              <SelectItem value="Q2" className="hover:bg-gray-100">Q2</SelectItem>
              <SelectItem value="Q3" className="hover:bg-gray-100">Q3</SelectItem>
              <SelectItem value="Q4" className="hover:bg-gray-100">Q4</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="bg-white"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Tax Report
          </Button>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <CalculatorIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Tax</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${taxSummary.estimatedTax.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <ReceiptIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Deductions</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${taxSummary.deductions.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Taxable Income</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${taxSummary.taxableIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tax Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deductible Expenses */}
        <Card className="p-6 bg-white">
          <h3 className="text-base font-medium text-gray-900 mb-4">Deductible Expenses</h3>
          <div className="space-y-4">
            {deductibleExpenses.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{expense.category}</span>
                  <span className="text-gray-900">${expense.amount.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${expense.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tax Documents */}
        <Card className="p-6 bg-white">
          <h3 className="text-base font-medium text-gray-900 mb-4">Tax Documents</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileTextIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Q1 Tax Report</p>
                  <p className="text-xs text-gray-500">Generated on Feb 20, 2024</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileTextIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Annual Tax Summary 2023</p>
                  <p className="text-xs text-gray-500">Generated on Jan 15, 2024</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 