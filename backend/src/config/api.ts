import axios from 'axios';

// For development and testing, we'll use a mock API
const MOCK_API_URL = 'https://jsonplaceholder.typicode.com';

// Use the environment variable if set, otherwise use the mock API
const API_URL = import.meta.env.VITE_API_URL || MOCK_API_URL;

console.log('Using API URL:', API_URL);

// Mock data for testing
const mockTransactions = [
  {
    id: '1',
    collect_id: 'COL123',
    school_id: 'SCH001',
    gateway: 'PhonePe',
    order_amount: 2000,
    transaction_amount: 2200,
    status: 'success',
    custom_order_id: 'ORD123'
  },
  {
    id: '2',
    collect_id: 'COL124',
    school_id: 'SCH002',
    gateway: 'Paytm',
    order_amount: 3000,
    transaction_amount: 3300,
    status: 'pending',
    custom_order_id: 'ORD124'
  },
  {
    id: '3',
    collect_id: 'COL125',
    school_id: 'SCH001',
    gateway: 'Razorpay',
    order_amount: 1500,
    transaction_amount: 1650,
    status: 'failed',
    custom_order_id: 'ORD125'
  }
];

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - unable to connect to the server');
    }
    return Promise.reject(error);
  }
);

// Mock API implementation
export const mockApi = {
  get: async (url: string) => {
    if (url === '/transactions') {
      return { data: mockTransactions };
    }
    throw new Error('Endpoint not found');
  }
}; 