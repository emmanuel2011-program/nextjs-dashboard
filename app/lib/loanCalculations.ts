// 1. Add these type definitions at the top
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};
// 2. Your existing functions remain here
export function calculateInterest(amount: number, rate: number, months: number) {
  return (amount * rate * months) / 100;
}

export function calculateMonthlyRepayment(amount: number, rate: number, months: number) {
  const total = calculateInterest(amount, rate, months) + amount;
  return total / months;
}



