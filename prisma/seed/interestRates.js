const db = require('../db');

const interestRatesSeed = [
  { rate: 12.5 },
  { rate: 13 },
  { rate: 15 },
];

async function seedInterestRates() {
  for (const rate of interestRatesSeed) {
    await db.interestRate.create({ data: rate });
  }
  console.log('✅ Interest rates seeded');
}

module.exports = { seedInterestRates };