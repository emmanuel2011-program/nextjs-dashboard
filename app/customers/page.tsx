import Link from "next/link";

export default function CustomersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Customers</h1>
      <p>Customer information and profile page.</p>

      <Link
        href="/loans/apply"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply for Loan
      </Link>
    </div>
  );
}