import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CountyCard({ name, description, imageUrl }) {
  return (
    <Card className="flex flex-col w-full max-w-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <img 
          src={imageUrl} 
          alt={`A scene from ${name} county`} 
          className="object-cover w-full h-52" 
        />
      </CardHeader>
      
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-2xl font-bold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          {name}
        </CardTitle>
        <CardDescription className="mt-3 text-base">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link to="/get-involved">
            Join {name} Team <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}