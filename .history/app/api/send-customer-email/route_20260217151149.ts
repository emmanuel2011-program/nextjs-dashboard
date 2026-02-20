import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Create email body
    const htmlBody = `
      <h2>Customer Form Submission</h2>
      <h3>Personal Information</h3>
      <p>Title: ${data.title}</p>
      <p>Name: ${data.firstName} ${data.middleName} ${data.surname}</p>
      <p>Date of Birth: ${data.dateOfBirth}</p>
      <p>Gender: ${data.gender}</p>
      <p>Nationality: ${data.nationality}</p>
      <p>State of Origin: ${data.stateOfOrigin}</p>
      <p>Local Govt Area: ${data.localGovtArea}</p>
      <p>Marital Status: ${data.maritalStatus}</p>
      <p>Spouse Name: ${data.spouseName}</p>
      <p>Mother's Maiden Name: ${data.mothersMaidenName}</p>
      <p>Name of First Child: ${data.firstChildName}</p>
      <p>Residential Address: ${data.residentialAddress}</p>
      <p>Contact Address: ${data.contactAddress}</p>
      <p>TIN: ${data.tin}</p>
      <p>Email: ${data.email}</p>
      <p>Mobile Phone: ${data.mobilePhone}</p>
      <p>Home Phone: ${data.homePhone}</p>
      <p>Office Phone: ${data.officePhone}</p>
      <p>Alternative Bank Name: ${data.altBankName}</p>
      <p>Education: ${data.educationalLevel}</p>
      <p>Profession: ${data.profession}</p>
      <p>Date of Employment: ${data.dateOfEmployment}</p>
      <p>Employment Status: ${data.employmentStatus}</p>
      <p>Expected Monthly Income: ${data.expectedIncome}</p>
      <p>Employer Details: ${data.employerDetails}</p>

      <h3>Loan/Facility Details</h3>
      <p>Loan Amount: ${data.loanAmount}</p>
      <p>Date of Request: ${data.requestDate}</p>
      <p>Duration (months): ${data.duration}</p>
      <p>Interest (%): ${data.interest}</p>
      <p>Repayment Date: ${data.repaymentDate}</p>
    `;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your sending email
        pass: process.env.EMAIL_PASS, // App password if Gmail
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Sfortefinance@yahoo.com',
      subject: 'New Customer Form Submission',
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
