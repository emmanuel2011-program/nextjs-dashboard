'use client'; // Only if you plan to add interactive state later, otherwise you can remove this

import Link from 'next/link';

export default function CustomersPage() {
  return (
    <div className="p-6 space-y-6"> 
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600">Customer information and profile page.</p>
      </div>
      
      <Link
        href="/loans/apply"
        className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        Apply for Loan
      </Link>
    </div>
  );
}