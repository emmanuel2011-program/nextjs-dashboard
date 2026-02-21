import { db } from '@/lib/db';

export const interestRatesSeed = [
  { rate: 12.5 },
  { rate: 13 },
  { rate: 15 },
];

export async function seedInterestRates() {
  for (const interest of interestRatesSeed) {
    await db.interestRate.create({ data: interest });
  }
  console.log('Interest rates seeded successfully!');
}