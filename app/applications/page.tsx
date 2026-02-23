// app/applications/page.tsx
import Link from 'next/link';
// import { db } from '@/app/lib/db'; // Uncomment once your Prisma client is set up

export default async function TrackApplications() {
  // In a real app, you'd fetch this from Neon:
  // const applications = await db.loanApplication.findMany();
  
  // Mock data for preview:
  const applications = [
    { id: '1', type: 'Personal Loan', amount: '5,000', status: 'Pending', date: '2024-05-20' },
    { id: '2', type: 'Membership', amount: '100', status: 'Approved', date: '2024-05-15' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <Link href="/loans/apply" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Application
        </Link>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-gray-500 border-2 border-dashed p-10 text-center rounded-xl">
            You haven't submitted any applications yet.
          </p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-6 border rounded-xl shadow-sm bg-white">
              <div>
                <h3 className="font-semibold text-lg">{app.type}</h3>
                <p className="text-sm text-gray-500">Submitted on {app.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${app.amount}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                  app.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}