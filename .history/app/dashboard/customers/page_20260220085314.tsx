'use client';

import { useState, useRef, useEffect } from 'react';

type FormDataType = {
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

const initialState: FormDataType = {
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
  const [formData, setFormData] = useState<FormDataType>(initialState);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 1) {
      firstNameRef.current?.focus();
    }
  }, [step]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value, // always string
    }));
  };

  const validateStep = () => {
    let fields: (keyof FormDataType)[] = [];

    if (step === 1) {
      fields = ['title', 'surname', 'firstName', 'middleName', 'dateOfBirth', 'gender', 'nationality'];
    }
    if (step === 2) {
      fields = ['residentialAddress', 'contactAddress', 'tin', 'email', 'mobilePhone'];
    }
    if (step === 3) {
      fields = ['loanAmount', 'requestDate', 'duration', 'interest', 'repaymentDate'];
    }

    for (const field of fields) {
      if (!formData[field]) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitted(true);
    setFormData(initialState);
    setStep(1);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold">Customer & Loan Form</h1>
      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Title">
              <input name="title" value={formData.title} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Surname">
              <input name="surname" value={formData.surname} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="First Name">
              <input ref={firstNameRef} name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Middle Name">
              <input name="middleName" value={formData.middleName} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Date of Birth">
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Gender">
              <div className="flex gap-4 mt-2">
                <label>
                  <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
                </label>
              </div>
            </Field>

            <Field label="Nationality">
              <input name="nationality" value={formData.nationality} onChange={handleChange} className="border p-2 rounded" />
            </Field>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <Field label="Residential Address">
              <textarea name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Contact Address">
              <textarea name="contactAddress" value={formData.contactAddress} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="TIN">
                <input name="tin" value={formData.tin} onChange={handleChange} className="border p-2 rounded" />
              </Field>

              <Field label="Email">
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
              </Field>

              <Field label="Mobile Phone">
                <input name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} className="border p-2 rounded" />
              </Field>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Loan Amount">
              <input name="loanAmount" value={formData.loanAmount} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Request Date">
              <input type="date" name="requestDate" value={formData.requestDate} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Duration (months)">
              <input name="duration" value={formData.duration} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Interest (%)">
              <input name="interest" value={formData.interest} onChange={handleChange} className="border p-2 rounded" />
            </Field>

            <Field label="Repayment Date">
              <input type="date" name="repaymentDate" value={formData.repaymentDate} onChange={handleChange} className="border p-2 rounded" />
            </Field>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Previous</button>}
          {step < 3 && <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {step === 3 && <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>

      </form>
    </div>
  );
}