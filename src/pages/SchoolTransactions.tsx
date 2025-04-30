import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TransactionsTable from '../components/TransactionsTable';

export default function SchoolTransactions() {
  const { schoolId } = useParams();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['schoolTransactions', schoolId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/payment/transactions/school/${schoolId}`);
      return response.data;
    },
  });

  const filteredTransactions = transactions.filter((transaction: any) => {
    if (statusFilter !== 'all' && transaction.status !== statusFilter) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transactions for School {schoolId}</h1>
      
      <div className="mb-6">
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <TransactionsTable transactions={filteredTransactions} />
    </div>
  );
} 