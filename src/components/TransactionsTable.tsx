import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: string;
  custom_order_id: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  error?: unknown;
}

export default function TransactionsTable({ transactions, isLoading, error }: TransactionsTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' } | null>(null);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
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

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {[
              { key: 'collect_id', label: 'Collect ID', width: 'w-[12%] min-w-[120px]' },
              { key: 'school_id', label: 'School ID', width: 'w-[12%] min-w-[120px]' },
              { key: 'gateway', label: 'Gateway', width: 'w-[12%] min-w-[120px]' },
              { key: 'order_amount', label: 'Order Amount', width: 'w-[16%] min-w-[150px]' },
              { key: 'transaction_amount', label: 'Transaction Amount', width: 'w-[16%] min-w-[150px]' },
              { key: 'status', label: 'Status', width: 'w-[12%] min-w-[100px]' },
              { key: 'custom_order_id', label: 'Custom Order ID', width: 'w-[20%] min-w-[200px]' },
            ].map(({ key, label, width }) => (
              <th
                key={key}
                scope="col"
                className={`${width} px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-300`}
                onClick={() => requestSort(key as keyof Transaction)}
              >
                <div className="flex items-center space-x-1">
                  <span>{label}</span>
                  {sortConfig?.key === key && (
                    sortConfig.direction === 'asc' ? (
                      <ArrowUpIcon className="h-2.5 w-2.5" />
                    ) : (
                      <ArrowDownIcon className="h-2.5 w-2.5" />
                    )
                  )}
                </div>
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                {transaction.custom_order_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 