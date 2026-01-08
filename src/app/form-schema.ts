import { z } from 'zod';

export const cashOfferSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { message: 'Please enter a valid phone number.' }),
  streetAddress: z.string().min(5, { message: 'Please enter a valid street address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  state: z.string().min(2, { message: 'Please enter a valid state.' }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Please enter a valid ZIP code.' }),
  propertyDetails: z.string().optional(),
});

export type CashOfferFormValues = z.infer<typeof cashOfferSchema>;
