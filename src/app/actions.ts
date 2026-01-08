'use server';

import { cashOfferSchema, type CashOfferFormValues } from './form-schema';
import { generateCashOffer, type GenerateCashOfferOutput } from '@/ai/flows/generate-cash-offer';

type ActionState = {
  offer?: GenerateCashOfferOutput;
  errors?: Partial<Record<keyof CashOfferFormValues, string[]>> & { _form?: string[] };
  message?: string;
};

export async function getCashOfferAction(values: CashOfferFormValues): Promise<ActionState> {
  const validatedFields = cashOfferSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your entries.',
    };
  }

  try {
    const offer = await generateCashOffer(validatedFields.data);
    return { offer, message: 'Success! Here is your cash offer.' };
  } catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occurred while generating your offer. Please try again later.',
    };
  }
}
