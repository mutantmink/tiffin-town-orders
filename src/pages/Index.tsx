
import { useState } from 'react';
import { Search, Filter, MapPin, Clock, Star, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import KitchenCard from '@/components/KitchenCard';
import FilterSidebar from '@/components/FilterSidebar';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: '',
    dietType: '',
    priceRange: '',
    deliveryTime: ''
  });

  // Sample kitchen data
  const kitchens = [
    {
      id: 1,
      name: "Amma's Kitchen",
      cuisine: "South Indian",
      rating: 4.8,
      deliveryTime: "30-45 min",
      location: "Koramangala",
      isVeg: true,
      priceRange: "₹80-150",
      image: "photo-1618160702438-9b02ab6515c9",
      specialties: ["Home-style meals", "Thali", "Fresh daily"]
    },
    {
      id: 2,
      name: "Punjab Da Dhaba",
      cuisine: "North Indian",
      rating: 4.6,
      deliveryTime: "25-40 min",
      location: "Indiranagar",
      isVeg: false,
      priceRange: "₹100-200",
      image: "photo-1618160702438-9b02ab6515c9",
      specialties: ["Authentic Punjabi", "Butter Chicken", "Fresh Roti"]
    },
    {
      id: 3,
      name: "Healthy Bites",
      cuisine: "Continental",
      rating: 4.7,
      deliveryTime: "20-35 min",
      location: "Whitefield",
      isVeg: true,
      priceRange: "₹120-250",
      image: "photo-1618160702438-9b02ab6515c9",
      specialties: ["Organic ingredients", "Diet meals", "Protein rich"]
    }
  ];

  const filteredKitchens = kitchens.filter(kitchen => {
    const matchesSearch = kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kitchen.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Homestyle Meals
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover local kitchens serving authentic, homemade food in your area
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex bg-white rounded-full p-2 shadow-lg">
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input
                  placeholder="Search for kitchens, cuisines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 text-gray-800 placeholder:text-gray-500 focus-visible:ring-0"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline" 
                size="sm" 
                className="mr-2 text-gray-600 hover:text-gray-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500">150+</div>
              <div className="text-gray-600">Local Kitchens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">25min</div>
              <div className="text-gray-600">Avg Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 hidden md:block">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}

          {/* Kitchen Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Kitchens ({filteredKitchens.length})
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Nearby
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Top Rated
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKitchens.map((kitchen) => (
                <KitchenCard key={kitchen.id} kitchen={kitchen} />
              ))}
            </div>

            {filteredKitchens.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No kitchens found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TiffinConnect</h3>
              <p className="text-gray-400">
                Connecting you with the best homestyle meals in your neighborhood.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How it works</li>
                <li>Delivery areas</li>
                <li>Customer support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Kitchens</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Partner with us</li>
                <li>Vendor dashboard</li>
                <li>Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About us</li>
                <li>Contact</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TiffinConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
