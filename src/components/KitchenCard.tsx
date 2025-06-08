
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Leaf } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Kitchen {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  location: string;
  isVeg: boolean;
  priceRange: string;
  image: string;
  specialties: string[];
}

interface KitchenCardProps {
  kitchen: Kitchen;
}

const KitchenCard = ({ kitchen }: KitchenCardProps) => {
  return (
    <Link to={`/kitchen/${kitchen.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <div className="relative">
          <img
            src={`https://images.unsplash.com/${kitchen.image}?w=400&h=200&fit=crop`}
            alt={kitchen.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            {kitchen.isVeg && (
              <Badge className="bg-green-500 hover:bg-green-600">
                <Leaf className="h-3 w-3 mr-1" />
                Veg
              </Badge>
            )}
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-white text-gray-800 font-semibold">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {kitchen.rating}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">
                {kitchen.name}
              </h3>
              <p className="text-gray-600 text-sm">{kitchen.cuisine}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {kitchen.deliveryTime}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {kitchen.location}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{kitchen.priceRange}</span>
              <div className="flex gap-1">
                {kitchen.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default KitchenCard;
