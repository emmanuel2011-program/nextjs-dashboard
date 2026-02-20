'use client';

import { useState, useRef, useEffect } from 'react';

export default function Page() {
  const initialState = {
    title: '',
    surname: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    residentialAddress: '',
    contactAddress: '',
    tin: '',
    email: '',
    mobilePhone: '',
    loanAmount: '',
    requestDate: '',
    duration: '',
    interest: '',
    repaymentDate: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (step === 1) firstNameRef.current?.focus();
  }, [step]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value, // functional update preserves cursor position
    }));
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const validateStep = () => {
    let requiredFields: string[] = [];
    if (step === 1) requiredFields = ['title', 'surname', 'firstName', 'middleName', 'dateOfBirth', 'gender', 'nationality'];
    else if (step === 2) requiredFields = ['residentialAddress', 'contactAddress', 'tin', 'email', 'mobilePhone'];
    else if (step === 3) requiredFields = ['loanAmount', 'requestDate', 'duration', 'interest', 'repaymentDate'];

    for (const key of requiredFields) {
      if (!formData[key as keyof typeof formData]) {
        alert(`Please fill in ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitted(true);
    setFormData(initialState);
    setStep(1);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md overflow-auto max-h-[90vh] space-y-6">
      <h1 className="text-2xl font-bold">Customer Information & Loan Form</h1>
      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Title"><input name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Surname"><input name="surname" value={formData.surname} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="First Name"><input ref={firstNameRef} name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Middle Name"><input name="middleName" value={formData.middleName} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Date of Birth"><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Gender">
              <div className="flex gap-4 mt-2">
                <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
              </div>
            </Field>
            <Field label="Nationality"><input name="nationality" value={formData.nationality} onChange={handleChange} className="border p-2 rounded" /></Field>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <Field label="Residential Address"><textarea name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} className="border p-2 rounded" rows={2} /></Field>
            <Field label="Contact Address"><textarea name="contactAddress" value={formData.contactAddress} onChange={handleChange} className="border p-2 rounded" rows={2} /></Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="TIN"><input name="tin" value={formData.tin} onChange={handleChange} className="border p-2 rounded" /></Field>
              <Field label="Email"><input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" /></Field>
              <Field label="Mobile Phone"><input type="tel" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} className="border p-2 rounded" /></Field>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Loan Amount"><input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Request Date"><input type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Duration (months)"><input type="number" name="duration" value={formData.duration} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Interest (%)"><input type="number" name="interest" value={formData.interest} onChange={handleChange} className="border p-2 rounded" /></Field>
            <Field label="Repayment Date"><input type="date" name="repaymentDate" value={formData.repaymentDate} onChange={handleChange} className="border p-2 rounded" /></Field>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-4">
          {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Previous</button>}
          {step < 3 && <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {step === 3 && <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>
      </form>
    </div>
  );
}
