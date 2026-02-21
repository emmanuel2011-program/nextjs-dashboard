'use client';

import { useState } from 'react';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  membershipType: string;
  idDocument: File | null;
};

const initialState: FormData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  membershipType: '',
  idDocument: null,
};

export default function MembershipPage() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    for (const [key, value] of Object.entries(formData)) {
      if (value === '' || value === null) {
        alert(`Please fill in ${key}`);
        return;
      }
    }

    console.log('Membership Form Submitted:', formData);
    setSubmitted(true);
    setFormData(initialState);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold">Membership Page</h1>
      <p>
        Welcome to the membership page. Here you can view membership details,
        apply for new membership, or manage your existing membership.
      </p>

      {/* Membership Plans */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold">Membership Plans</h2>
        <ul className="list-disc list-inside">
          <li>Standard Membership</li>
          <li>Premium Membership</li>
          <li>Corporate Membership</li>
        </ul>
      </section>

      {/* Apply for Membership */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold">Apply for Membership</h2>
        <p>Click the button below to open the membership application form.</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? 'Close Form' : 'Apply Now'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-gray-50 p-4 rounded shadow">
            {submitted && (
              <p className="text-green-600 font-semibold">
                Your membership form has been submitted successfully!
              </p>
            )}
            <Input label="Full Name" value={formData.fullName} onChange={val => handleChange('fullName', val)} />
            <Input label="Email" type="email" value={formData.email} onChange={val => handleChange('email', val)} />
            <Input label="Phone Number" value={formData.phone} onChange={val => handleChange('phone', val)} />
            <Input label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={val => handleChange('dateOfBirth', val)} />
            <Textarea label="Residential Address" value={formData.address} onChange={val => handleChange('address', val)} />

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Membership Type</label>
              <select
                className="border p-2 rounded"
                value={formData.membershipType}
                onChange={e => handleChange('membershipType', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Upload ID Document</label>
              <input
                type="file"
                onChange={e => handleChange('idDocument', e.target.files?.[0] || null)}
              />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Submit Membership
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

/* Input and Textarea components */
function Input({ label, value, onChange, type = 'text' }: any) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <input
        type={type}
        className="border p-2 rounded"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <textarea
        rows={3}
        className="border p-2 rounded"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}