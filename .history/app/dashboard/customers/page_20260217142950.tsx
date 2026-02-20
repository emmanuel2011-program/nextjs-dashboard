'use client';
import { useState } from 'react';

export default function CustomerFormPage() {
  const [formData, setFormData] = useState({
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
    foreignersPermitNo: '',
    permitExpiry: '',
    idType: '',
    idNo: '',
    idIssueDate: '',
    idExpiryDate: '',
    idPlaceOfIssue: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
    nextOfKinEmail: '',
    spouseParentTitle: '',
    spouseParentSurname: '',
    spouseParentFirstName: '',
    spouseParentMiddleName: '',
    spouseParentDOB: '',
    spouseParentGender: '',
    spouseParentNationality: '',
    spouseParentStateOfOrigin: '',
    spouseParentLocalGovt: '',
    spouseParentMaritalStatus: '',
    spouseParentName: '',
    spouseParentMothersMaiden: '',
    spouseParentFirstChildName: '',
    agreementText: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submitted data:', formData);

    // TODO: send to API
    // await fetch('/api/customers', { method: 'POST', body: JSON.stringify(formData) })

    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md space-y-6">
      <h1 className="text-2xl font-bold">Customer Information Form</h1>

      {submitted && (
        <p className="text-green-600 font-medium">
          Form submitted successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* State / Local Govt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="stateOfOrigin"
            placeholder="State of Origin"
            value={formData.stateOfOrigin}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="localGovtArea"
            placeholder="Local Govt. Area"
            value={formData.localGovtArea}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="maritalStatus"
            placeholder="Marital Status"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Spouse Details */}
        <input
          type="text"
          name="spouseName"
          placeholder="Spouse's Name"
          value={formData.spouseName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        {/* Mother & First Child */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="mothersMaidenName"
            placeholder="Mother’s Maiden Name"
            value={formData.mothersMaidenName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="firstChildName"
            placeholder="Name of First Child"
            value={formData.firstChildName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Residential / Contact Address */}
        <textarea
          name="residentialAddress"
          placeholder="Residential Address"
          value={formData.residentialAddress}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={2}
        />
        <textarea
          name="contactAddress"
          placeholder="Contact Address"
          value={formData.contactAddress}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={2}
        />

        {/* Tax / Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="tin"
            placeholder="Tax Identification Number (TIN)"
            value={formData.tin}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="mobilePhone"
            placeholder="Mobile Phone"
            value={formData.mobilePhone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="homePhone"
            placeholder="Home Phone"
            value={formData.homePhone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="officePhone"
            placeholder="Office Phone"
            value={formData.officePhone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="altBankName"
          placeholder="Alternative Bank Account / Bank Name"
          value={formData.altBankName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="educationalLevel"
            placeholder="Educational Level"
            value={formData.educationalLevel}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="profession"
            placeholder="Business / Profession"
            value={formData.profession}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="month"
            name="dateOfEmployment"
            placeholder="Date of Employment"
            value={formData.dateOfEmployment}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <select
          name="expectedIncome"
          value={formData.expectedIncome}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Expected Monthly Income</option>
          <option value="<50,000">Below 50,000</option>
          <option value="51,000-500,000">51,000-500,000</option>
          <option value="500,000-1M">500,000-1M</option>
          <option value="1M-5M">1M-5M</option>
          <option value="Above 5M">Above 5M</option>
        </select>

        {/* Employer */}
        <textarea
          name="employerDetails"
          placeholder="Name and Address of Employer"
          value={formData.employerDetails}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={2}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
