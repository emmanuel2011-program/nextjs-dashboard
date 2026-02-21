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

  spouseName: string;
  spouseMobilePhone: string;
  spouseTitle: string;
  spouseDOB: string;
  spouseGender: string;
  spouseNationality: string;
  spouseStateOfOrigin: string;
  spouseLocalGovt: string;
  spouseMaritalStatus: string;
  spouseResidentialAddress: string;

  bankName: string;
  accountType: string;
  accountName: string;
  accountNumber: string;

  document: File | null;
  signature: string;
  passportPhoto: File | null;

  agreementName1: string;
  agreementName2: string;
  agreementName3: string;
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
  spouseName: '',
  spouseMobilePhone: '',
  spouseTitle: '',
  spouseDOB: '',
  spouseGender: '',
  spouseNationality: '',
  spouseStateOfOrigin: '',
  spouseLocalGovt: '',
  spouseMaritalStatus: '',
  spouseResidentialAddress: '',
  bankName: '',
  accountType: '',
  accountName: '',
  accountNumber: '',
  document: null,
  signature: '',
  passportPhoto: null,
  agreementName1: '',
  agreementName2: '',
  agreementName3: '',
};

export default function Page() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      1: ['title','surname','firstName','dateOfBirth','gender','nationality'],
      2: ['residentialAddress','contactAddress','tin','email','mobilePhone'],
      3: ['loanAmount','requestDate','duration','interest','repaymentDate'],
      4: ['spouseName','spouseMobilePhone','spouseTitle','spouseDOB','spouseGender','spouseNationality','spouseStateOfOrigin','spouseLocalGovt','spouseMaritalStatus','spouseResidentialAddress'],
      5: ['bankName','accountType','accountName','accountNumber','document','signature'],
      6: ['agreementName1','agreementName2','agreementName3'],
    };

    for (const field of stepFields[step] || []) {
      if (!formData[field] || (field === 'document' && formData.document === null)) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }

    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,15}$/;
      const tinRegex = /^\d{1,11}$/;
     
      if (!tinRegex.test(formData.tin)) {
        alert('TIN must be numeric and max 11 digits');
        return false;
      }
      
      if (!emailRegex.test(formData.email)) {
        alert('Enter a valid email');
        return false;
      }
      if (!phoneRegex.test(formData.mobilePhone)) {
        alert('Enter a valid phone number');
        return false;
      }
    }

    if (step === 4) {
      const spouseMobilePhoneRegex = /^\+?\d{10,15}$/;
      if (!spouseMobilePhoneRegex.test(formData.spouseMobilePhone)) {
        alert('Enter a valid spouse phone number');
        return false;
      }
    }

    if (step === 5) {
      const accountNumberRegex = /^\d{1,10}$/;
      if (!accountNumberRegex.test(formData.accountNumber)) {
        alert('Account number must be numeric and max 10 digits');
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

    console.log("Form submitted:", formData);

    setSubmitted(true);
    setFormData(initialState);
    setStep(1);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 bg-green-100 border border-green-400 rounded text-center">
        <h2 className="text-2xl font-bold text-green-800">
          ✅ Application Submitted Successfully
        </h2>
        <p className="mt-2 text-green-700">
          Your loan application has been received. We will contact you shortly.
        </p>

        <button
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h1 className="text-2xl font-bold">Customer & Loan Application Form</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Title" name="title" onBlur={updateField} />
            <Input label="Surname" name="surname" onBlur={updateField} />
            <Input label="First Name" name="firstName" onBlur={updateField} />
            <Input label="Middle Name (optional)" name="middleName" onBlur={updateField} />
            <Input label="Date of Birth" type="date" name="dateOfBirth" onBlur={updateField} />
            <Input label="Nationality" name="nationality" onBlur={updateField} />

            <div>
              <label className="block text-sm font-semibold">Gender</label>
              <label><input type="radio" name="gender" value="Male" onChange={e => updateField('gender', e.target.value)} /> Male</label>
              <label className="ml-4"><input type="radio" name="gender" value="Female" onChange={e => updateField('gender', e.target.value)} /> Female</label>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <Textarea label="Residential Address" name="residentialAddress" onBlur={updateField} />
            <Textarea label="Contact Address" name="contactAddress" onBlur={updateField} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="TIN" name="tin" maxLength={11} pattern="\d{1,11}" onBlur={updateField} />
              <Input label="Email" type="email" name="email" onBlur={updateField} />
              <Input label="Mobile Phone" name="mobilePhone" pattern="^\+?\d{10,15}$" onBlur={updateField} />
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Loan Amount" name="loanAmount" onBlur={updateField} />
            <Input label="Request Date" type="date" name="requestDate" onBlur={updateField} />
            <div className="flex flex-col">
              <label>Duration (months)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={e => updateField('duration', e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">--Select Duration--</option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>Interest (%)</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={e => updateField('interest', e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">--Select Interest--</option>
                <option value="15">15%</option>
              </select>
            </div>
            <Input label="Repayment Date" type="date" name="repaymentDate" onBlur={updateField} />
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold">Spouse Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Spouse Full Name" name="spouseName" onBlur={updateField} />
              <Input label="Spouse Mobile Phone" name="spouseMobilePhone" pattern="^\+?\d{10,15}$" onBlur={updateField} />
              <Input label="Title" name="spouseTitle" onBlur={updateField} />
              <Input label="Date of Birth" type="date" name="spouseDOB" onBlur={updateField} />
              <Input label="Gender" name="spouseGender" onBlur={updateField} />
              <Input label="Nationality" name="spouseNationality" onBlur={updateField} />
              <Input label="State of Origin" name="spouseStateOfOrigin" onBlur={updateField} />
              <Input label="Local Govt Area" name="spouseLocalGovt" onBlur={updateField} />
              <Input label="Marital Status" name="spouseMaritalStatus" onBlur={updateField} />
              <Textarea label="Residential Address" name="spouseResidentialAddress" onBlur={updateField} />
            </div>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-semibold">Customer Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Bank Name" name="bankName" onBlur={updateField} />
              <Input label="Account Type" name="accountType" onBlur={updateField} />
              <Input label="Account Number" name="accountNumber" onBlur={updateField} />
              <Input label="Account Name" name="accountName" onBlur={updateField} />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Upload ID</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={e => updateField('document', e.target.files?.[0] || null)}
              />
              {formData.document && <span className="text-sm text-gray-500 mt-1">Selected: {formData.document.name}</span>}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Upload Passport Photo</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={e => updateField('passportPhoto', e.target.files?.[0] || null)}
              />
              {formData.passportPhoto && <span className="text-sm text-gray-500 mt-1">Selected: {formData.passportPhoto.name}</span>}
            </div>

            <input
              type="text"
              placeholder="Type your full name as signature"
              className="border p-2 rounded"
              value={formData.signature}
              onChange={e => updateField('signature', e.target.value)}
            />
          </>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                hereby irrevocably and unconditionally agree to abide by the agreement 
                covering the said institution, to make good any loss the firm may suffer 
                as a result of my non compliance to the said agreement.
              </p>
              <input
                className="border p-2 rounded w-full"
                placeholder="Enter your full name"
                value={formData.agreementName1}
                onChange={e => updateField('agreementName1', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                And shall pay to the institution, the bank written demand and any monies 
                due or incurred as a result of my non compliance to this agreement.
              </p>
              <input
                className="border p-2 rounded w-full"
                placeholder="Enter your full name"
                value={formData.agreementName2}
                onChange={e => updateField('agreementName2', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                I also agree with the COOPERATIVE institution’s management to further pay 
                for any losses intended or not intended during the transaction.
              </p>
              <input
                className="border p-2 rounded w-full"
                placeholder="Enter your full name"
                value={formData.agreementName3}
                onChange={e => updateField('agreementName3', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 6 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 6 && <button type="submit">Submit</button>}
        </div>

      </form>
    </div>
  );
}

function Input({ label, name, type='text', onBlur, maxLength, pattern }: any) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        pattern={pattern}
        className="border p-2"
        onBlur={e => onBlur(name, e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, name, onBlur }: any) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <textarea
        className="border p-2"
        rows={2}
        onBlur={e => onBlur(name, e.target.value)}
      />
    </div>
  );
}