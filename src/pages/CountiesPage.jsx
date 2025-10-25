import { CountyCard } from '@/components/sections/CountyCard';
import { Helmet } from 'react-helmet-async';

const countiesData = [
  {
    name: "Nairobi",
    description: "Our central hub for mentorship and urban environmental projects.",
    imageUrl: "https://images.unsplash.com/photo-1595428774236-c040df1f7d14?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Nakuru",
    description: "Expanding our reach with school outreach and conservation efforts.",
    imageUrl: "https://images.unsplash.com/photo-1581486902202-0a2663f71c35?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Kiambu",
    description: "Fostering community growth through mentorship and local drives.",
    imageUrl: "https://images.unsplash.com/photo-1541356269597-0361a153e9f4?q=80&w=1966&auto=format&fit=crop"
  },
  {
    name: "Machakos",
    description: "Building strong foundations for youth empowerment and spiritual growth.",
    imageUrl: "https://images.unsplash.com/photo-1620173873436-566b83f3f1e9?q=80&w=1932&auto=format&fit=crop"
  },
  {
    name: "Kajiado",
    description: "Engaging with local communities on environmental and mentorship programs.",
    imageUrl: "https://images.unsplash.com/photo-1620763266945-addf689b7b74?q=80&w=2070&auto=format&fit=crop"
  },
];

export function CountiesPage() {
  return (
    <>
      <Helmet>
        <title>Our Counties | StreetWise Global Network</title>
        <meta name="description" content="See our active work in Nairobi, Nakuru, Kiambu, Machakos, and Kajiado." />
      </Helmet>
      <div className="container py-16">
        <h1 className="text-4xl font-bold text-center">Our Core Counties</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          We are actively working to build and renovate in these key areas.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {countiesData.map((county) => (
            <CountyCard
              key={county.name}
              name={county.name}
              description={county.description}
              imageUrl={county.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}