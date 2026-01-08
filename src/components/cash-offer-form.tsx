"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CashOfferFormValues } from '@/app/form-schema';
import { cashOfferSchema } from '@/app/form-schema';
import { getCashOfferAction } from '@/app/actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import OfferDialog from './offer-dialog';
import type { GenerateCashOfferOutput } from '@/ai/flows/generate-cash-offer';
import { useToast } from '@/hooks/use-toast';

export function CashOfferForm() {
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [offer, setOffer] = useState<GenerateCashOfferOutput | undefined>(undefined);
  const { toast } = useToast();

  const form = useForm<CashOfferFormValues>({
    resolver: zodResolver(cashOfferSchema),
    mode: 'onChange', // Validate on input change
    defaultValues: {
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
      propertyAddress: '',
      propertyDetails: '',
    },
  });

  async function onSubmit(values: CashOfferFormValues) {
    setIsPending(true);

    const result = await getCashOfferAction(values);
    
    if (result.offer) {
      setOffer(result.offer);
      setDialogOpen(true);
      form.reset();
    } else {
      const errors = result.errors;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          const field = key as keyof CashOfferFormValues;
          const message = errors[field as keyof typeof errors]?.[0];
          if (message && form.hasUncontrolledError(field)) {
            form.setError(field, { type: 'server', message });
          }
        });
      }
      if (result.message && !errors) { // Show toast for general errors
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
    setIsPending(false);
  }
  
  return (
    <>
      <Card className="w-full max-w-lg shadow-2xl bg-card/90 backdrop-blur-sm border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl lg:text-4xl font-headline">Get Your Free Cash Offer!</CardTitle>
          <CardDescription>Fast, fair, and no obligations. Fill out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} autoComplete="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} type="email" autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} type="tel" autoComplete="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Anytown, USA" {...field} autoComplete="address-line1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Details <span className="text-muted-foreground">(optional)</span></FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 3 bedrooms, 2 baths, needs new roof" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-12 font-bold transition-all duration-300 transform hover:scale-105" disabled={isPending}>
                {isPending ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Offer...</>
                ) : (
                  'Get My Cash Offer'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {offer && (
        <OfferDialog
          isOpen={isDialogOpen}
          onOpenChange={setDialogOpen}
          offer={offer}
        />
      )}
    </>
  );
}
