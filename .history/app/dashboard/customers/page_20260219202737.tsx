'use client';

import { useState, useRef, useEffect, memo } from 'react';

// Memoized FormField to prevent unnecessary re-renders
interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  rows?: number;
}

const FormField = memo(({ label, name, value, type = 'text', onChange, inputRef, rows }: FormFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="border p-2 rounded"
          rows={rows || 2}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border p-2 rounded"
        />
      )}
    </div>
  );
});

export default function Page() {
  const initialState = {
    title: '',
    surname: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    stateOfOrigin: '',
    localGovtArea: '',
    maritalStatus: '',
    spouseName: '',
    mothersMaidenName: '',
    firstChildName: '',
    residentialAddress: '',
    contactAddress: '',
    tin: '',
    email: '',
    mobilePhone: '',
    homePhone: '',
    officePhone: '',
    altBankName: '',
    educationalLevel: '',
    profession: '',
    dateOfEmployment: '',
    employmentStatus: '',
    expectedIncome: '',
    employerDetails: '',
    loanAmount: '',
    requestDate: '',
    duration: '',
    interest: '',
    repaymentDate: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);

  // Auto-focus first name on mount
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        alert(`Please fill in ${key}`);
        return;
      }
    }

    setSubmitted(true);
    setTimeout(() => setFormData(initialState), 200); // Delay reset to prevent cursor jump
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md overflow-auto max-h-[90vh] space-y-6">
      <h1 className="text-2xl font-bold">Customer Information & Loan Form</h1>

      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField label="Title" name="title" value={formData.title} onChange={handleChange} />
          <FormField label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
          <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} inputRef={firstNameRef} />
          <FormField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
          
          <div>
            <label className="text-sm font-medium mb-1 block">Gender</label>
            <div className="flex gap-4 mt-2">
              <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
              </label>
            </div>
          </div>

          <FormField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
        </div>

        {/* Address */}
        <FormField label="Residential Address" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} type="textarea" />
        <FormField label="Contact Address" name="contactAddress" value={formData.contactAddress} onChange={handleChange} type="textarea" />

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="TIN" name="tin" value={formData.tin} onChange={handleChange} />
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <FormField label="Mobile Phone" name="mobilePhone" type="tel" value={formData.mobilePhone} onChange={handleChange} />
        </div>

        {/* Loan Details */}
        <h2 className="text-xl font-semibold mt-6">Loan Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Loan Amount" name="loanAmount" type="number" value={formData.loanAmount} onChange={handleChange} />
          <FormField label="Request Date" name="requestDate" type="date" value={formData.requestDate} onChange={handleChange} />
          <FormField label="Duration (months)" name="duration" type="number" value={formData.duration} onChange={handleChange} />
          <FormField label="Interest (%)" name="interest" type="number" value={formData.interest} onChange={handleChange} />
          <FormField label="Repayment Date" name="repaymentDate" type="date" value={formData.repaymentDate} onChange={handleChange} />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
