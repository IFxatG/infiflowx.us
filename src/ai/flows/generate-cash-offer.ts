'use server';

/**
 * @fileOverview AI flow to generate a cash offer for a property based on user-submitted details.
 *
 * - generateCashOffer -  A function that takes property details as input and returns a cash offer.
 * - GenerateCashOfferInput - The input type for the generateCashOffer function.
 * - GenerateCashOfferOutput - The return type for the generateCashOffer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCashOfferInputSchema = z.object({
  fullName: z.string().describe('The full name of the user.'),
  emailAddress: z.string().email().describe('The email address of the user.'),
  phoneNumber: z.string().describe('The phone number of the user.'),
  propertyAddress: z.string().describe('The full address of the property.'),
  propertyDetails: z.string().describe('Any extra details about the property.'),
});
export type GenerateCashOfferInput = z.infer<typeof GenerateCashOfferInputSchema>;

const GenerateCashOfferOutputSchema = z.object({
  offerAmount: z.number().describe('The generated cash offer amount for the property.'),
  marketAnalysis: z.string().describe('Brief market analysis justifying the offer amount.'),
});
export type GenerateCashOfferOutput = z.infer<typeof GenerateCashOfferOutputSchema>;

export async function generateCashOffer(input: GenerateCashOfferInput): Promise<GenerateCashOfferOutput> {
  return generateCashOfferFlow(input);
}

const generateCashOfferPrompt = ai.definePrompt({
  name: 'generateCashOfferPrompt',
  input: {schema: GenerateCashOfferInputSchema},
  output: {schema: GenerateCashOfferOutputSchema},
  prompt: `You are an AI assistant specialized in generating fair cash offers for properties.

  Based on the information provided, formulate a fair cash offer and a brief market analysis.

  Consider the following information:
  Full Name: {{{fullName}}}
  Email Address: {{{emailAddress}}}
  Phone Number: {{{phoneNumber}}}
  Property Address: {{{propertyAddress}}}
  Property Details: {{{propertyDetails}}}

  Respond with a fair offerAmount and a brief marketAnalysis justifying your offer.
  Ensure the offer is competitive and attractive to the seller, reflecting current market conditions.
  `,
});

const generateCashOfferFlow = ai.defineFlow(
  {
    name: 'generateCashOfferFlow',
    inputSchema: GenerateCashOfferInputSchema,
    outputSchema: GenerateCashOfferOutputSchema,
  },
  async input => {
    const {output} = await generateCashOfferPrompt(input);
    return output!;
  }
);
