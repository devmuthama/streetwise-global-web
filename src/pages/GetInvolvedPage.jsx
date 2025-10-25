import { VolunteerForm } from '@/components/sections/VolunteerForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, UserPlus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

// Stripe Checkout Logic
async function handleDonateClick() {
  // In a real app, you'd get the session URL from your backend
  // const { data } = await supabase.functions.invoke('create-checkout-session', { body: { amount: 5000, currency: 'kes' } });
  // window.location.href = data.checkoutUrl;
  
  // Placeholder for demo
  alert("Redirecting to Stripe/Flutterwave... (Backend function needed)");
}

export function GetInvolvedPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDonation = async () => {
    setIsSubmitting(true);
    try {
      // Call Supabase Edge Function
      // const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      //   body: { amount: 5000, currency: 'kes' } // Example
      // });
      // if (error) throw error;
      // window.location.href = data.checkoutUrl;

      // Placeholder
      alert("Redirecting to Stripe Checkout...");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Involved | StreetWise Global Network</title>
        <meta name="description" content="Join us as a volunteer or support our mission with a donation." />
      </Helmet>
      <div className="container py-16">
        <h1 className="text-4xl font-bold text-center">Get Involved</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          You can be one of "those who can fix anything."
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Volunteer */}
          <Card>
            <CardHeader className="text-center">
              <UserPlus className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="text-3xl">Become a Volunteer</CardTitle>
              <CardDescription className="text-base">
                Join a county team and give your time and skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VolunteerForm />
            </CardContent>
          </Card>

          {/* Donate */}
          <Card>
            <CardHeader className="text-center">
              <DollarSign className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="text-3xl">Make a Donation</CardTitle>
              <CardDescription className="text-base">
                Your financial support fuels our programs and impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 pt-12">
              <p className="text-center text-muted-foreground">
                Every contribution helps us rebuild and renovate our communities. We partner with Stripe and Flutterwave for secure payments.
              </p>
              <Button size="lg" className="w-full text-lg py-7" onClick={handleDonation} disabled={isSubmitting}>
                {isSubmitting ? "Redirecting..." : "Donate Securely Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}