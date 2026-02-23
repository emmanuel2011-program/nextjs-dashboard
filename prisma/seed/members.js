// prisma/seed/members.js
import { db } from "../db.js"; // <-- correct relative path

const membersSeed = [
  {
    name: "Emmanuel Okoye",
    email: "emmanuel@example.com",
    phone: "+2348050900409",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+2348050900410",
  },
];

export async function seedMembers() {
  for (const member of membersSeed) {
    await db.member.create({ data: member });
  }
  console.log("✅ Members seeded");
}