import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';

// Placeholder data - client will provide this
const leadershipTeam = [
  { name: 'Felix Mungai', role: 'Chairperson', img: 'https://via.placeholder.com/300' },
  { name: 'Faith Muthoni', role: 'Secretary', img: 'https://via.placeholder.com/300' },
  { name: 'Samuel Ngati', role: 'Treasurer', img: 'https://via.placeholder.com/300' },
  { name: 'Faith Mutisya', role: '1st Board Member (Program & Impact)', img: 'https://via.placeholder.com/300' },
  { name: 'John Muthama', role: '2nd Board Member (Communications)', img: 'https://via.placeholder.com/300' },
];

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | StreetWise Global Network</title>
        <meta name="description" content="Learn about our vision, mission, and the dedicated team behind StreetWise Global Network." />
      </Helmet>
      <div className="container py-16">
        <h1 className="text-4xl font-bold text-center">About StreetWise Global</h1>
        
        {/* Vision and Mission */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-3xl font-semibold text-primary">Our Vision</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To raise enlightened, empowered, and purpose-driven youth who will be agents of transformation in their communities.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To achieve our vision through dedicated Mentorship, active Environmental Conservation, and foundational Spiritual Empowerment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leadership Team */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center">Meet Our Leadership</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {leadershipTeam.map((member) => (
              <Card key={member.name} className="overflow-hidden text-center">
                <img src={member.img} alt={member.name} className="h-64 w-full object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}