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

        <div className="grid grid-cols-1
