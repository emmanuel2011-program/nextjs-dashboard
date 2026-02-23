// prisma/seed/runSeed.js
import { seedMembers } from "./members.js";

async function main() {
  await seedMembers();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});