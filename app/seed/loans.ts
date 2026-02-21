import { db } from '@/lib/db';

export const loansSeed = [
  {
    memberId: 1,
    loanAmount: 50000,
    requestDate: '2026-02-01',
    duration: 1,
    interestRate: 15,
    repaymentDate: '2026-03-01',
    status: 'Approved',
  },
  {
    memberId: 2,
    loanAmount: 75000,
    requestDate: '2026-01-15',
    duration: 2,
    interestRate: 12.5,
    repaymentDate: '2026-03-15',
    status: 'Pending',
  },
  {
    memberId: 1,
    loanAmount: 100000,
    requestDate: '2025-12-01',
    duration: 2,
    interestRate: 13,
    repaymentDate: '2026-02-01',
    status: 'Paid',
  },
];

export async function seedLoans() {
  for (const loan of loansSeed) {
    await db.loan.create({ data: loan });
  }
  console.log('Loans seeded successfully!');
}