import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      throw new Error("Missing email environment variables");
    }

    // Build the HTML email body
    const htmlBody = `
      <h2>Customer & Loan Form Submission</h2>

      <h3>Personal Information</h3>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Name:</strong> ${data.firstName} ${data.middleName || ''} ${data.surname}</p>
      <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>Nationality:</strong> ${data.nationality}</p>

      <h3>Contact Information</h3>
      <p><strong>Residential Address:</strong> ${data.residentialAddress}</p>
      <p><strong>Contact Address:</strong> ${data.contactAddress}</p>
      <p><strong>TIN:</strong> ${data.tin}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile Phone:</strong> ${data.mobilePhone}</p>

      <h3>Loan Information</h3>
      <p><strong>Loan Amount:</strong> ${data.loanAmount}</p>
      <p><strong>Request Date:</strong> ${data.requestDate}</p>
      <p><strong>Duration:</strong> ${data.duration}</p>
      <p><strong>Interest:</strong> ${data.interest}</p>
      <p><strong>Repayment Date:</strong> ${data.repaymentDate}</p>

      <h3>Spouse Information</h3>
      <p><strong>Name:</strong> ${data.spouseName}</p>
      <p><strong>Title:</strong> ${data.spouseTitle}</p>
      <p><strong>Date of Birth:</strong> ${data.spouseDOB}</p>
      <p><strong>Gender:</strong> ${data.spouseGender}</p>
      <p><strong>Nationality:</strong> ${data.spouseNationality}</p>
      <p><strong>State of Origin:</strong> ${data.spouseStateOfOrigin}</p>
      <p><strong>Local Govt Area:</strong> ${data.spouseLocalGovt}</p>
      <p><strong>Marital Status:</strong> ${data.spouseMaritalStatus}</p>
      <p><strong>Residential Address:</strong> ${data.spouseResidentialAddress}</p>

      <h3>Bank Information</h3>
      <p><strong>Bank Name:</strong> ${data.bankName}</p>
      <p><strong>Account Type:</strong> ${data.accountType}</p>
      <p><strong>Account Name:</strong> ${data.accountName}</p>
      <p><strong>Account Number:</strong> ${data.accountNumber}</p>

      <h3>Agreements</h3>
      <p><strong>Agreement 1:</strong> ${data.agreementName1}</p>
      <p><strong>Agreement 2:</strong> ${data.agreementName2}</p>
      <p><strong>Agreement 3:</strong> ${data.agreementName3}</p>

      <p><strong>Signature:</strong> ${data.signature}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Customer & Loan Form Submission',
      html: htmlBody,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}