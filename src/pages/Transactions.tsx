import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../config/api';
import TransactionsTable from '../components/TransactionsTable';
import SearchInput from '../components/SearchInput';

interface Transaction {
  id: string;
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: string;
  custom_order_id: string;
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');

  const { data: transactions = [], isLoading, error } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await mockApi.get('/transactions');
      return response.data;
    },
  });

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = Object.values(transaction).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSchool = schoolFilter === 'all' || transaction.school_id === schoolFilter;
    return matchesSearch && matchesStatus && matchesSchool;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSchoolFilter('all');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white transition-colors duration-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transition-colors duration-300">
        <div className="text-red-500 space-y-4">
          <p>Unable to connect to the server. Please make sure the backend server is running.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            API URL: {import.meta.env.VITE_API_URL || 'Using Mock API'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="w-full md:w-80">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search transactions..."
                onClear={() => setSearchQuery('')}
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-32 pl-2 pr-6 py-2 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                className="block w-32 pl-2 pr-6 py-2 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Schools</option>
                <option value="SCH001">SCH001</option>
                <option value="SCH002">SCH002</option>
              </select>

              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing {filteredTransactions.length} transactions
              </p>
              <TransactionsTable transactions={filteredTransactions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 