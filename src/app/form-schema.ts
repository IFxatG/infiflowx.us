import { z } from 'zod';

export const cashOfferSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { message: 'Please enter a valid phone number.' }),
  propertyAddress: z.string().min(10, { message: 'Please enter a valid property address.' }),
  propertyDetails: z.string().optional(),
});

export type CashOfferFormValues = z.infer<typeof cashOfferSchema>;
