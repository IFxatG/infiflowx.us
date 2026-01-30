import Image from 'next/image';
import { Star, CheckCircle, Clock, DollarSign, Home as HomeIcon, Menu } from 'lucide-react';
import { CashOfferForm } from '@/components/cash-offer-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-house');
const avatar1 = PlaceHolderImages.find(p => p.id === 'testimonial-avatar-1');
const avatar2 = PlaceHolderImages.find(p => p.id === 'testimonial-avatar-2');
const avatar3 = PlaceHolderImages.find(p => p.id === 'testimonial-avatar-3');

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Cash Offer',
    description: "Receive a fair, no-obligation cash offer based on current market value. No lowballing, just a straightforward price.",
  },
  {
    icon: Clock,
    title: 'Close in Days, Not Months',
    description: 'Forget the lengthy process of traditional sales. We can close on your timeline, sometimes in as little as 7 days.',
  },
  {
    icon: HomeIcon,
    title: 'Sell "As-Is"',
    description: "Don't worry about repairs, cleaning, or staging. We buy your house in its current condition, saving you time and money.",
  },
  {
    icon: CheckCircle,
    title: 'No Hidden Fees or Commissions',
    description: 'The offer we make is the amount you get. We cover all closing costs, and there are absolutely no realtor commissions.',
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    location: 'Austin, TX',
    text: '"The process was unbelievably simple. I submitted my info on Monday, got an offer on Tuesday, and we closed the following week. I couldn\'t be happier!"',
    avatar: avatar1,
  },
  {
    name: 'Michael & Jennifer P.',
    location: 'Phoenix, AZ',
    text: '"We needed to sell our inherited property quickly without putting any more money into it. They gave us a fair price and handled everything. A huge weight was lifted off our shoulders."',
    avatar: avatar3,
  },
  {
    name: 'Robert D.',
    location: 'Tampa, FL',
    text: '"I was skeptical at first, but their team was professional and transparent from start to finish. The offer was fair, and there were no surprises at closing. Highly recommend."',
    avatar: avatar2,
  },
];


function Header() {
  const navItems = [
    { name: 'How It Works', href: '#benefits' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Get Offer', href: '#form' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-8 w-8 text-accent"/>
          <span className="text-xl font-bold font-headline text-white">
            QuickCash Homes
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className="text-sm font-medium hover:text-accent transition-colors">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground">
              <div className="flex flex-col space-y-6 pt-10">
                {navItems.map(item => (
                  <a key={item.name} href={item.href} className="text-lg hover:text-accent transition-colors">
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="form" className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-4 text-white">
        <div className="flex-1 text-center lg:text-left max-w-xl">
          <h1 className="font-headline text-4xl md:text-6xl font-bold !leading-tight">
            Sell Your House for Cash, <span className="text-accent">Fast.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            No realtors, no fees, no repairs. Just a simple, stress-free sale. Get a fair cash offer in minutes.
          </p>
        </div>
        <div className="flex-1 w-full max-w-lg">
          <CashOfferForm />
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">The Better Way to Sell Your Home</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We simplify the home-selling process to make it faster and easier for you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <benefit.icon className="h-8 w-8 text-accent" />
                  </div>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Trusted by Homeowners Like You</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See what others are saying about their experience with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col shadow-lg">
              <CardContent className="flex flex-col flex-grow p-6">
                <StarRating />
                <p className="mt-4 text-muted-foreground flex-grow">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center">
                  {testimonial.avatar && (
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <Separator className="bg-primary-foreground/10 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <HomeIcon className="h-6 w-6"/>
            <span className="text-lg font-bold font-headline">
              QuickCash Homes
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/50">
              &copy; {new Date().getFullYear()} QuickCash Homes. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/50 mt-1">
              Bluerock Partner Group LLC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
