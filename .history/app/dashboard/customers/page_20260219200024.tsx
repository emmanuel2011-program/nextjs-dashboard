'use client';

import { useState } from 'react';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setFormData(initialState);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-md overflow-auto max-h-[90vh] space-y-6">
      <h1 className="text-2xl font-bold">Customer Information & Loan Form</h1>

      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="Title">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Surname">
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="First Name">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Middle Name">
            <input
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Date of Birth">
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>

          <div>
            <label className="text-sm font-medium mb-1 block">Gender</label>
            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  required
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />{' '}
                Female
              </label>
            </div>
          </div>

          <Field label="Nationality">
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
        </div>

        {/* Address */}
        <Field label="Residential Address">
          <textarea
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            className="border p-2 rounded"
            rows={2}
            required
          />
        </Field>

        <Field label="Contact Address">
          <textarea
            name="contactAddress"
            value={formData.contactAddress}
            onChange={handleChange}
            className="border p-2 rounded"
            rows={2}
            required
          />
        </Field>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="TIN">
            <input
              name="tin"
              value={formData.tin}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Mobile Phone">
            <input
              type="tel"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
        </div>

        {/* Loan */}
        <h2 className="text-xl font-semibold mt-6">Loan Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Loan Amount">
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount || ''}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Request Date">
            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Duration (months)">
            <input
              type="number"
              name="duration"
              value={formData.duration || ''}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Interest (%)">
            <input
              type="number"
              name="interest"
              value={formData.interest || ''}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
          <Field label="Repayment Date">
            <input
              type="date"
              name="repaymentDate"
              value={formData.repaymentDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </Field>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
