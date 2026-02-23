// app/lib/actions.ts
'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function registerMember(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  try {
    const newMember = await db.membership.create({
      data: {
        title: rawData.title as string,
        surname: rawData.surname as string,
        firstName: rawData.firstName as string,
        middleName: (rawData.middleName as string) || null,
        dateOfBirth: rawData.dateOfBirth as string,
        gender: rawData.gender as string,
        nationality: rawData.nationality as string,
        residentialAddress: rawData.residentialAddress as string,
        contactAddress: rawData.contactAddress as string,
        tin: rawData.tin as string,
        email: rawData.email as string,
        mobilePhone: rawData.mobilePhone as string,
        bankName: rawData.bankName as string,
        accountType: rawData.accountType as string,
        accountName: rawData.accountName as string,
        accountNumber: rawData.accountNumber as string,
        spouseName: (rawData.spouseName as string) || null,
        spouseMobile: (rawData.spouseMobilePhone as string) || null,
        status: "Active",
      },
    });

    revalidatePath('/membership');
    revalidatePath('/applications');

    return { success: true, memberId: newMember.id };
  } catch (error: any) {
    console.error("Membership Error:", error);
    if (error.code === 'P2002') {
      return { success: false, message: "This email address is already registered." };
    }
    return { success: false, message: "Database connection error. Please try again later." };
  }
}

export async function submitLoanApplication(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  try {
    const newLoan = await db.loanApplication.create({
      data: {
        // 1. PERSONAL INFO
        title: rawData.title as string,
        surname: rawData.surname as string,
        firstName: rawData.firstName as string,
        middleName: (rawData.middleName as string) || "",
        dateOfBirth: rawData.dateOfBirth as string,
        gender: rawData.gender as string,
        nationality: rawData.nationality as string,

        // 2. CONTACT INFO (Added to fix build error)
        residentialAddress: rawData.residentialAddress as string,
        contactAddress: rawData.contactAddress as string,
        tin: rawData.tin as string,
        email: rawData.email as string,
        mobilePhone: rawData.mobilePhone as string,

        // 3. LOAN SPECIFICS
        loanAmount: rawData.loanAmount as string,
        requestDate: rawData.requestDate as string,
        duration: rawData.duration as string,
        interest: rawData.interest as string,
        repaymentDate: rawData.repaymentDate as string,

        // 4. SPOUSE INFO (Added to fix build error)
        spouseName: rawData.spouseName as string,
        spouseMobilePhone: rawData.spouseMobilePhone as string,
        spouseTitle: rawData.spouseTitle as string,
        spouseDOB: rawData.spouseDOB as string,
        spouseGender: rawData.spouseGender as string,
        spouseNationality: rawData.spouseNationality as string,
        spouseStateOfOrigin: rawData.spouseStateOfOrigin as string,
        spouseLocalGovt: rawData.spouseLocalGovt as string,
        spouseMaritalStatus: rawData.spouseMaritalStatus as string,
        spouseResidentialAddress: rawData.spouseResidentialAddress as string,
        
        // 5. BANKING INFO
        bankName: rawData.bankName as string,
        accountNumber: rawData.accountNumber as string,
        accountName: rawData.accountName as string,
        accountType: rawData.accountType as string,

        // 6. HOUSEKEEPING
        status: "PENDING",
        memberId: rawData.memberId as string,
      },
    });

    return { success: true, loanId: newLoan.id };
  } catch (error: any) {
    console.error("Loan Submission Error:", error);
    return { success: false, message: error.message };
  }
}