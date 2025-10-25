import { Hero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Globe, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const pillars = [
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: "Mentorship",
    description: "Empowering youth through guidance, support, and skill-building."
  },
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: "Environmental Conservation",
    description: "Restoring our communities by leading conservation drives and education."
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Spiritual Empowerment",
    description: "Nurturing purpose-driven lives grounded in strong values."
  },
];

export function HomePage() {
  return (
    <div>
      <Helmet>
        <title>StreetWise Global Network - Enlightened to Enlighten</title>
        <meta name="description" content="Raising enlightened, empowered, and purpose-driven youth who transform communities through mentorship, conservation, and spiritual empowerment." />
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* Pillars Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Our Mission Pillars</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
            We focus on three core areas to create holistic change.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {pillar.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl">{pillar.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Make a Difference?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Join us in rebuilding and renovating our communities. Whether you volunteer your time or donate, your support is invaluable.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/get-involved">Join as a Volunteer</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white hover:text-primary">
              <Link to="/get-involved">Make a Donation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}