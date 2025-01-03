'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Analytics } from '@/components/finance/Analytics';
import { InvoiceManagement } from '@/components/finance/InvoiceManagement';
import { BudgetManagement } from '@/components/finance/BudgetManagement';
import { RecurringTransactions } from '@/components/finance/RecurringTransactions';
import { TaxManagement } from '@/components/finance/TaxManagement';
import { Reports } from '@/components/finance/Reports';
import { PaymentIntegration } from '@/components/finance/PaymentIntegration';

const transactions = [
  {
    id: 1,
    type: 'expense',
    category: 'Feed & Supplies',
    amount: 2500.00,
    date: '2024-02-20',
    status: 'completed',
  },
  {
    id: 2,
    type: 'income',
    category: 'Livestock Sale',
    amount: 5000.00,
    date: '2024-02-19',
    status: 'completed',
  },
  {
    id: 3,
    type: 'expense',
    category: 'Veterinary Services',
    amount: 800.00,
    date: '2024-02-18',
    status: 'completed',
  },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Finance Management</h1>
        <p className="text-sm text-gray-500">
          Track and manage your farm's financial performance
        </p>
      </div>

      <Tabs
        defaultValue="analytics"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-white">
          <TabsTrigger value="analytics" className="hover:bg-gray-100">Analytics</TabsTrigger>
          <TabsTrigger value="invoices" className="hover:bg-gray-100">Invoices</TabsTrigger>
          <TabsTrigger value="budgets" className="hover:bg-gray-100">Budgets</TabsTrigger>
          <TabsTrigger value="recurring" className="hover:bg-gray-100">Recurring</TabsTrigger>
          <TabsTrigger value="tax" className="hover:bg-gray-100">Tax</TabsTrigger>
          <TabsTrigger value="reports" className="hover:bg-gray-100">Reports</TabsTrigger>
          <TabsTrigger value="payments" className="hover:bg-gray-100">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Analytics transactions={transactions} />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoiceManagement transactions={transactions} />
        </TabsContent>

        <TabsContent value="budgets">
          <BudgetManagement transactions={transactions} />
        </TabsContent>

        <TabsContent value="recurring">
          <RecurringTransactions transactions={transactions} />
        </TabsContent>

        <TabsContent value="tax">
          <TaxManagement transactions={transactions} />
        </TabsContent>

        <TabsContent value="reports">
          <Reports transactions={transactions} />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentIntegration transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 