'use client';

export default function MembershipPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold">Membership Page</h1>
      <p>
        Welcome to the membership page. Here you can view membership details,
        apply for new membership, or manage your existing membership.
      </p>

      {/* Example sections */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold">Membership Plans</h2>
        <ul className="list-disc list-inside">
          <li>Standard Membership</li>
          <li>Premium Membership</li>
          <li>Corporate Membership</li>
        </ul>
      </section>

      <section className="border p-4 rounded">
        <h2 className="font-semibold">Apply for Membership</h2>
        <p>Click the button below to open the membership application form.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Apply Now
        </button>
      </section>
    </div>
  );
}