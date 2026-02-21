import { seedMembers } from './members';
import { seedLoans } from './loans';
import { seedInterestRates } from './interestRates';

export async function runSeed() {
  console.log('Seeding database...');
  await seedMembers();
  await seedLoans();
  await seedInterestRates();
  console.log('All seeds completed!');
}

runSeed().catch(err => {
  console.error('Error seeding database:', err);
});