// app/api/sendForm/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Required environment variables
    const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
      throw new Error("Missing email environment variables");
    }

    // Basic required fields validation
    const requiredFields = [
      'title','firstName','surname','dateOfBirth','gender','nationality',
      'residentialAddress','email','mobilePhone',
      'loanAmount','requestDate','duration','interest','repaymentDate',
      'bankName','accountName','accountNumber','signature'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` });
      }
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
      <p><strong>Contact Address:</strong> ${data.contactAddress || 'N/A'}</p>
      <p><strong>TIN:</strong> ${data.tin || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile Phone:</strong> ${data.mobilePhone}</p>

      <h3>Loan Information</h3>
      <p><strong>Loan Amount:</strong> ${data.loanAmount}</p>
      <p><strong>Request Date:</strong> ${data.requestDate}</p>
      <p><strong>Duration:</strong> ${data.duration}</p>
      <p><strong>Interest:</strong> ${data.interest}</p>
      <p><strong>Repayment Date:</strong> ${data.repaymentDate}</p>

      <h3>Spouse Information</h3>
      <p><strong>Name:</strong> ${data.spouseName || 'N/A'}</p>
      <p><strong>Title:</strong> ${data.spouseTitle || 'N/A'}</p>
      <p><strong>Date of Birth:</strong> ${data.spouseDOB || 'N/A'}</p>
      <p><strong>Gender:</strong> ${data.spouseGender || 'N/A'}</p>
      <p><strong>Nationality:</strong> ${data.spouseNationality || 'N/A'}</p>
      <p><strong>State of Origin:</strong> ${data.spouseStateOfOrigin || 'N/A'}</p>
      <p><strong>Local Govt Area:</strong> ${data.spouseLocalGovt || 'N/A'}</p>
      <p><strong>Marital Status:</strong> ${data.spouseMaritalStatus || 'N/A'}</p>
      <p><strong>Residential Address:</strong> ${data.spouseResidentialAddress || 'N/A'}</p>

      <h3>Bank Information</h3>
      <p><strong>Bank Name:</strong> ${data.bankName}</p>
      <p><strong>Account Type:</strong> ${data.accountType || 'N/A'}</p>
      <p><strong>Account Name:</strong> ${data.accountName}</p>
      <p><strong>Account Number:</strong> ${data.accountNumber}</p>

      <h3>Agreements</h3>
      <p><strong>Agreement 1:</strong> ${data.agreementName1 || 'N/A'}</p>
      <p><strong>Agreement 2:</strong> ${data.agreementName2 || 'N/A'}</p>
      <p><strong>Agreement 3:</strong> ${data.agreementName3 || 'N/A'}</p>

      <p><strong>Signature:</strong> ${data.signature}</p>
    `;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Build attachments array if files are provided
    const attachments = [];
    if (data.document) {
      attachments.push({
        filename: data.document.name,
        content: Buffer.from(data.document.data, 'base64'),
      });
    }
    if (data.passportPhoto) {
      attachments.push({
        filename: data.passportPhoto.name,
        content: Buffer.from(data.passportPhoto.data, 'base64'),
      });
    }

    // Send email
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'New Customer & Loan Form Submission',
      html: htmlBody,
      attachments,
    });

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully! You will receive a confirmation email shortly.',
    });

  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({
      success: false,
      error: (err as Error).message,
    });
  }
}