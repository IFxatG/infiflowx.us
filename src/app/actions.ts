'use server';

import { Resend } from 'resend';
import { cashOfferSchema, type CashOfferFormValues } from './form-schema';

type ActionState = {
  success?: boolean;
  errors?: Partial<Record<keyof CashOfferFormValues, string[]>> & { _form?: string[] };
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getCashOfferAction(values: CashOfferFormValues): Promise<ActionState> {
  const validatedFields = cashOfferSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your entries.',
    };
  }

  try {
    const data = validatedFields.data;
    const propertyAddress = `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}`;
    
    // Send email with form data
    await resend.emails.send({
      from: 'QuickCash Homes <onboarding@resend.dev>', // You'll need to verify your domain
      to: process.env.NOTIFICATION_EMAIL || 'your-email@example.com',
      subject: `New Cash Offer Request - ${propertyAddress}`,
      html: `
        <h2>New Cash Offer Request</h2>
        
        <h3>Property Address</h3>
        <p>${propertyAddress}</p>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.emailAddress}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber}</p>
        
        ${data.propertyDetails ? `
        <h3>Additional Details</h3>
        <p>${data.propertyDetails}</p>
        ` : ''}
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          This inquiry was submitted from QuickCash Homes website.
        </p>
      `,
    });

    return { 
      success: true,
      message: 'Thank you! We received your information and will contact you shortly with a cash offer.' 
    };
  } catch (e) {
    console.error('Email send error:', e);
    return {
      message: 'An error occurred while submitting your request. Please try again or contact us directly.',
    };
  }
}
