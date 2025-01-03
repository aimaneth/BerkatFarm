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
  CreditCard as CreditCardIcon,
  Building2 as BankIcon,
  RefreshCw as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  Plus as PlusIcon,
  Link as LinkIcon,
} from 'lucide-react';

interface PaymentIntegrationProps {
  transactions: Array<{
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    status: string;
  }>;
}

export function PaymentIntegration({ transactions }: PaymentIntegrationProps) {
  const [selectedAccount, setSelectedAccount] = useState('all');

  const connectedAccounts = [
    {
      id: 1,
      name: 'Business Checking',
      type: 'Bank Account',
      institution: 'Metro Bank',
      lastSync: '2024-02-20 09:30 AM',
      balance: 15000.00,
      status: 'connected',
    },
    {
      id: 2,
      name: 'Business Credit Card',
      type: 'Credit Card',
      institution: 'Capital One',
      lastSync: '2024-02-20 09:30 AM',
      balance: -2500.00,
      status: 'connected',
    },
  ];

  const pendingPayments = [
    {
      id: 1,
      description: 'Feed Supply Payment',
      amount: 2500.00,
      dueDate: '2024-02-25',
      status: 'pending',
      recipient: 'Farm Supplies Co.',
    },
    {
      id: 2,
      description: 'Equipment Maintenance',
      amount: 800.00,
      dueDate: '2024-02-28',
      status: 'scheduled',
      recipient: 'Farm Equipment Services',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'scheduled':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Payment Integration</h2>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectedAccounts.map((account) => (
          <Card key={account.id} className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-gray-100">
                  {account.type === 'Bank Account' ? (
                    <BankIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <CreditCardIcon className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {account.name}
                  </h3>
                  <p className="text-sm text-gray-500">{account.institution}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p className={`text-sm font-medium ${
                  account.balance >= 0 ? 'text-gray-900' : 'text-red-600'
                }`}>
                  ${Math.abs(account.balance).toFixed(2)}
                  {account.balance < 0 && ' (Credit)'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Synced</p>
                <p className="text-sm text-gray-900">{account.lastSync}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="bg-white"
              >
                <RefreshIcon className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pending Payments */}
      <Card className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-900">Pending Payments</h3>
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Schedule Payment
          </Button>
        </div>

        <div className="space-y-4">
          {pendingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(payment.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {payment.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">To: {payment.recipient}</span>
                    <span className="text-xs text-gray-500">Due: {payment.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-gray-900">
                  ${payment.amount.toFixed(2)}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Settings */}
      <Card className="p-6 bg-white">
        <h3 className="text-base font-medium text-gray-900 mb-4">Payment Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default Payment Account</label>
              <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">All Accounts</SelectItem>
                  {connectedAccounts.map((account) => (
                    <SelectItem 
                      key={account.id} 
                      value={account.id.toString()}
                      className="hover:bg-gray-100"
                    >
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Payment Notifications</label>
              <Select>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select notification preference" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="hover:bg-gray-100">All Notifications</SelectItem>
                  <SelectItem value="important" className="hover:bg-gray-100">Important Only</SelectItem>
                  <SelectItem value="none" className="hover:bg-gray-100">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 