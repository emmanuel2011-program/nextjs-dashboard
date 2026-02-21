import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listActivities() {
  const data = await sql`
    SELECT members.name, loans.amount, loans.date
    FROM members
    JOIN loans ON members.id = loans.member_id
    WHERE loans.amount > 0;
  `;
  return data;
}

export async function GET() {
  try {
    const activities = await listActivities();
    return NextResponse.json({ activities });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}