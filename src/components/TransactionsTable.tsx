import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from '../services/websocket';
import { Tooltip } from 'react-tooltip';
import { format } from 'date-fns';
import { formatCurrency } from '../utils/formatCurrency';
import { getTransactions } from '../services/api';
import { Transaction } from '../types/transaction';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  error?: unknown;
}

export const TransactionsTable = () => {
  const queryClient = useQueryClient();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' }>({
    key: 'collect_id',
    direction: 'desc'
  });

  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const handleTransactionUpdate = (updatedTransaction: Transaction) => {
    queryClient.setQueryData<Transaction[]>(['transactions'], (oldData) => {
      if (!oldData) return [updatedTransaction];
      
      const index = oldData.findIndex(t => t.collect_id === updatedTransaction.collect_id);
      if (index === -1) {
        return [updatedTransaction, ...oldData];
      }
      
      const newData = [...oldData];
      newData[index] = updatedTransaction;
      return newData;
    });
  };

  const { sendMessage } = useWebSocket(
    'wss://your-websocket-server.com',
    handleTransactionUpdate
  );

  const sortedTransactions = [...transactions].sort((a, b) => {
    const { key, direction } = sortConfig;
    
    // Handle numeric values differently
    if (key === 'order_amount' || key === 'transaction_amount') {
      return direction === 'asc' 
        ? a[key] - b[key]
        : b[key] - a[key];
    }
    
    // Handle string values
    const aValue = String(a[key]).toLowerCase();
    const bValue = String(b[key]).toLowerCase();
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-800 dark:text-red-200">
          Error loading transactions: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
      </div>
    );
  }

  const columns = [
    { key: 'collect_id', label: 'Collect ID', width: 'w-[12%] min-w-[120px]', tooltip: 'Click to sort by Collect ID' },
    { key: 'school_id', label: 'School ID', width: 'w-[12%] min-w-[120px]', tooltip: 'Click to sort by School ID' },
    { key: 'gateway', label: 'Gateway', width: 'w-[12%] min-w-[120px]', tooltip: 'Click to sort by Payment Gateway' },
    { key: 'order_amount', label: 'Order Amount', width: 'w-[16%] min-w-[150px]', tooltip: 'Click to sort by Order Amount' },
    { key: 'transaction_amount', label: 'Transaction Amount', width: 'w-[16%] min-w-[150px]', tooltip: 'Click to sort by Transaction Amount' },
    { key: 'status', label: 'Status', width: 'w-[12%] min-w-[100px]', tooltip: 'Click to sort by Status' },
    { key: 'custom_order_id', label: 'Custom Order ID', width: 'w-[20%] min-w-[200px]', tooltip: 'Click to sort by Custom Order ID' },
  ];

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex items-center space-x-2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-sm text-gray-600">Real-time updates active</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {columns.map(({ key, label, width, tooltip }) => (
                <th
                  key={key}
                  scope="col"
                  data-tooltip-id={`sort-${key}`}
                  data-tooltip-content={tooltip}
                  className={`${width} px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                    sortConfig.key === key ? 'bg-gray-100 dark:bg-gray-700/50' : ''
                  }`}
                  onClick={() => requestSort(key as keyof Transaction)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortConfig.key === key && (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUpIcon className="h-2.5 w-2.5" />
                      ) : (
                        <ArrowDownIcon className="h-2.5 w-2.5" />
                      )
                    )}
                  </div>
                  <Tooltip id={`sort-${key}`} place="top" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={transaction.collect_id}
                className={`${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800/50' : 'bg-gray-50 dark:bg-gray-700/50'
                } hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-300`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {transaction.collect_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {transaction.school_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {transaction.gateway}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  ₹{transaction.order_amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  ₹{transaction.transaction_amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                  {transaction.payment_time && new Date(transaction.payment_time).getTime() > Date.now() - 30000 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {transaction.custom_order_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 