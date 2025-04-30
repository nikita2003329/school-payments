import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

export const getTransactions = async () => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

export const getTransactionsBySchool = async (schoolId: string) => {
  const response = await axios.get(`${API_URL}/transactions/school/${schoolId}`);
  return response.data;
};

export const getTransactionStatus = async (customOrderId: string) => {
  const response = await axios.get(`${API_URL}/transaction-status/${customOrderId}`);
  return response.data;
};

export const WS_ENDPOINT = WS_URL; 