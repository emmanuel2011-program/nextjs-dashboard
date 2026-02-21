export function calculateInterest(amount: number, rate: number, months: number) {
  return (amount * rate * months) / 100;
}

export function calculateMonthlyRepayment(amount: number, rate: number, months: number) {
  const total = calculateInterest(amount, rate, months) + amount;
  return total / months;
}