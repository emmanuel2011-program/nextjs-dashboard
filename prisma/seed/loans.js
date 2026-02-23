const db = require('../db');

const loansSeed = [
  {
    memberId: 1,
    loanAmount: 50000,
    duration: 1,
    interestRate: 15,
    
    
  },
  {
    memberId: 2,
    loanAmount: 75000,
    duration: 2,
    interestRate: 12.5,
  
  },
];

async function seedLoans() {
  for (const loan of loansSeed) {
    await db.loan.create({ data: loan });
  }
  console.log('✅ Loans seeded');
}

module.exports = { seedLoans };