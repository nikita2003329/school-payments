import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TransactionStatus = () => {
  const { customOrderId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactionStatus', customOrderId],
    queryFn: async () => {
      if (!customOrderId) return null;
      const response = await axios.get(`/api/transaction-status/${customOrderId}`);
      return response.data;
    },
    enabled: !!customOrderId,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!customOrderId) return <div className="p-4">Please enter a transaction ID</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
      {data && (
        <div className="bg-white p-4 rounded-lg shadow">
          <p><span className="font-semibold">Status:</span> {data.status}</p>
          <p><span className="font-semibold">Amount:</span> {data.transaction_amount}</p>
          <p><span className="font-semibold">Payment Mode:</span> {data.payment_mode}</p>
          <p><span className="font-semibold">Payment Time:</span> {new Date(data.payment_time).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus; 