import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      throw new Error("Missing email environment variables");
    }

    const htmlBody = `
      <h2>Customer Form Submission</h2>
      <h3>Personal Information</h3>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Name:</strong> ${data.firstName} ${data.middleName} ${data.surname}</p>
      <p><strong>Date of Birth:</strong> ${data.dateOfBirth}</p>
      <p><strong>Gender:</strong> ${data.gender}</p>
      <p><strong>Nationality:</strong> ${data.nationality}</p>
      <p><strong>State of Origin:</strong> ${data.stateOfOrigin}</p>
      <p><strong>Local Govt Area:</strong> ${data.localGovtArea}</p>
      <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
      <p><strong>Spouse Name:</strong> ${data.spouseName}</p>
      <p><strong>Mother's Maiden Name:</strong> ${data.mothersMaidenName}</p>
      <p><strong>First Child:</strong> ${data.firstChildName}</p>
      <p><strong>Residential Address:</strong> ${data.residentialAddress}</p>
      <p><strong>Contact Address:</strong> ${data.contactAddress}</p>
      <p><strong>TIN:</strong> ${data.tin}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile Phone:</strong> ${data.mobilePhone}</p>
      <p><strong>Home Phone:</strong> ${data.homePhone}</p>
      <p><strong>Office Phone:</strong> ${data.officePhone}</p>
      <p><strong>Alternative Bank:</strong> ${data.altBankName}</p>
      <p><strong>Education:</strong> ${data.educationalLevel}</p>
      <p><strong>Profession:</strong> ${data.profession}</p>
      <p><strong>Date of Employment:</strong> ${data.dateOfEmployment}</p>
      <p><strong>Employment Status:</strong> ${data.employmentStatus}</p>
      <p><strong>Expected Income:</strong> ${data.expectedIncome}</p>
      <p><strong>Employer Details:</strong> ${data.employerDetails}</p>

      <h3>Loan Details</h3>
      <p><strong>Loan Amount:</strong> ${data.loanAmount}</p>
      <p><strong>Request Date:</strong> ${data.requestDate}</p>
      <p><strong>Duration:</strong> ${data.duration}</p>
      <p><strong>Interest:</strong> ${data.interest}</p>
      <p><strong>Repayment Date:</strong> ${data.repaymentDate}</p>
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
      subject: 'New Customer Form Submission',
      html: htmlBody,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message });
  }
}
