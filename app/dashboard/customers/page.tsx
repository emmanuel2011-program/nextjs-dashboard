'use client';

import { useState } from 'react';

type FormData = {
  title: string;
  surname: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  residentialAddress: string;
  contactAddress: string;
  tin: string;
  email: string;
  mobilePhone: string;
  loanAmount: string;
  requestDate: string;
  duration: string;
  interest: string;
  repaymentDate: string;
};

const initialState: FormData = {
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

export default function Page() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      1: ['title', 'surname', 'firstName', 'middleName', 'dateOfBirth', 'gender', 'nationality'],
      2: ['residentialAddress', 'contactAddress', 'tin', 'email', 'mobilePhone'],
      3: ['loanAmount', 'requestDate', 'duration', 'interest', 'repaymentDate'],
    };

    for (const field of stepFields[step]) {
      if (!formData[field]) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }
    return true;
  };

  const nextStep = () => validateStep() && setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    console.log(formData);
    setSubmitted(true);
    setFormData(initialState);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold">Customer Information & Loan Form</h1>

      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Title" name="title" onBlur={updateField} />
            <Input label="Surname" name="surname" onBlur={updateField} />
            <Input label="First Name" name="firstName" onBlur={updateField} />
            <Input label="Middle Name" name="middleName" onBlur={updateField} />
            <Input label="Date of Birth" type="date" name="dateOfBirth" onBlur={updateField} />
            <Input label="Nationality" name="nationality" onBlur={updateField} />

            <div>
              <label className="block text-sm">Gender</label>
              <label><input type="radio" name="gender" value="Male" onChange={e => updateField('gender', e.target.value)} /> Male</label>
              <label className="ml-4"><input type="radio" name="gender" value="Female" onChange={e => updateField('gender', e.target.value)} /> Female</label>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <Textarea label="Residential Address" name="residentialAddress" onBlur={updateField} />
            <Textarea label="Contact Address" name="contactAddress" onBlur={updateField} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="TIN" name="tin" onBlur={updateField} />
              <Input label="Email" type="email" name="email" onBlur={updateField} />
              <Input label="Mobile Phone" name="mobilePhone" onBlur={updateField} />
            </div>
          </>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Loan Amount" name="loanAmount" onBlur={updateField} />
            <Input label="Request Date" type="date" name="requestDate" onBlur={updateField} />
            <Input label="Duration" name="duration" onBlur={updateField} />
            <Input label="Interest" name="interest" onBlur={updateField} />
            <Input label="Repayment Date" type="date" name="repaymentDate" onBlur={updateField} />
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 3 && <button type="submit">Submit</button>}
        </div>

      </form>
    </div>
  );
}

function Input({ label, name, type = 'text', onBlur }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <input
        name={name}
        type={type}
        className="border p-2 rounded"
        defaultValue=""
        onBlur={(e) => onBlur(name, e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, name, onBlur }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <textarea
        name={name}
        className="border p-2 rounded"
        rows={2}
        defaultValue=""
        onBlur={(e) => onBlur(name, e.target.value)}
      />
    </div>
  );
}