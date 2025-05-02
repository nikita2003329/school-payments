export interface Transaction {
  collect_id: string;
  school_id: string;
  gateway: string;
  order_amount: number;
  transaction_amount: number;
  status: string;
  custom_order_id: string;
  payment_time?: string;
  payment_mode?: string;
  bank_reference?: string;
  payment_message?: string;
  error_message?: string;
} 