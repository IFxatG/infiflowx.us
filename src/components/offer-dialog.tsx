"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText } from 'lucide-react';
import type { GenerateCashOfferOutput } from '@/ai/flows/generate-cash-offer';

interface OfferDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  offer: GenerateCashOfferOutput;
}

export default function OfferDialog({ isOpen, onOpenChange, offer }: OfferDialogProps) {
  const formattedOffer = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(offer.offerAmount);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <DialogTitle className="text-center text-3xl font-headline text-primary">Congratulations!</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2">We've generated a preliminary cash offer for your property.</DialogDescription>
        </DialogHeader>
        <div className="my-6 text-center bg-secondary rounded-lg p-6">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Your Estimated Cash Offer</p>
          <p className="text-5xl font-bold font-headline text-primary my-2">{formattedOffer}</p>
        </div>
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-primary"><FileText size={16} /> Market Analysis</h3>
            <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md border">{offer.marketAnalysis}</p>
        </div>
        <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">A representative will be in touch with you shortly to discuss the next steps.</p>
        </div>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
