
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';

const KitchenDetails = () => {
  const { id } = useParams();
  const [cart, setCart] = useState<Record<number, number>>({});

  // Sample kitchen data - in real app, fetch based on ID
  const kitchen = {
    id: 1,
    name: "Amma's Kitchen",
    cuisine: "South Indian",
    rating: 4.8,
    reviews: 245,
    deliveryTime: "30-45 min",
    location: "Koramangala",
    isVeg: true,
    priceRange: "₹80-150",
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Authentic South Indian home-style cooking with fresh ingredients and traditional recipes passed down through generations.",
    specialties: ["Home-style meals", "Thali", "Fresh daily"],
    menu: [
      {
        id: 1,
        name: "South Indian Thali",
        description: "Complete meal with rice, sambar, rasam, vegetables, curd, and pickle",
        price: 120,
        isVeg: true,
        category: "Thali",
        image: "photo-1618160702438-9b02ab6515c9"
      },
      {
        id: 2,
        name: "Curd Rice",
        description: "Comforting curd rice with tempering and pickle",
        price: 80,
        isVeg: true,
        category: "Rice",
        image: "photo-1618160702438-9b02ab6515c9"
      },
      {
        id: 3,
        name: "Sambar Rice",
        description: "Aromatic rice with traditional sambar and vegetables",
        price: 90,
        isVeg: true,
        category: "Rice",
        image: "photo-1618160702438-9b02ab6515c9"
      },
      {
        id: 4,
        name: "Vegetable Biriyani",
        description: "Fragrant basmati rice with mixed vegetables and spices",
        price: 140,
        isVeg: true,
        category: "Biriyani",
        image: "photo-1618160702438-9b02ab6515c9"
      }
    ]
  };

  const categories = [...new Set(kitchen.menu.map(item => item.category))];

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartTotal = kitchen.menu.reduce((total, item) => {
    return total + (cart[item.id] || 0) * item.price;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to kitchens
          </Button>
        </Link>
      </div>

      {/* Kitchen Hero */}
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden mb-4 lg:mb-8">
          <div className="relative">
            <img
              src={`https://images.unsplash.com/${kitchen.image}?w=1200&h=300&fit=crop`}
              alt={kitchen.name}
              className="w-full h-48 md:h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{kitchen.name}</h1>
              <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs lg:text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {kitchen.rating} ({kitchen.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {kitchen.deliveryTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {kitchen.location}
                </div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-green-500">
                <Leaf className="h-3 w-3 mr-1" />
                Pure Veg
              </Badge>
              <Badge variant="outline">{kitchen.cuisine}</Badge>
              <Badge variant="outline">{kitchen.priceRange}</Badge>
            </div>
            <p className="text-gray-600 mb-4 text-sm lg:text-base">{kitchen.description}</p>
            <div className="flex flex-wrap gap-2">
              {kitchen.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Menu</h2>
            
            {categories.map((category) => (
              <div key={category} className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-orange-500">{category}</h3>
                <div className="space-y-3 lg:space-y-4">
                  {kitchen.menu
                    .filter(item => item.category === category)
                    .map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-3 lg:p-4">
                          <div className="flex gap-3 lg:gap-4">
                            <img
                              src={`https://images.unsplash.com/${item.image}?w=120&h=120&fit=crop`}
                              alt={item.name}
                              className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-base lg:text-lg flex items-center gap-2 mb-1">
                                    <span className="truncate">{item.name}</span>
                                    {item.isVeg && <Leaf className="h-4 w-4 text-green-500 flex-shrink-0" />}
                                  </h4>
                                  <p className="text-gray-600 text-xs lg:text-sm mb-2 line-clamp-2">{item.description}</p>
                                  <p className="font-bold text-base lg:text-lg">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {cart[item.id] > 0 ? (
                                    <div className="flex items-center gap-1 lg:gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => removeFromCart(item.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="w-6 lg:w-8 text-center font-medium text-sm">
                                        {cart[item.id]}
                                      </span>
                                      <Button
                                        size="sm"
                                        onClick={() => addToCart(item.id)}
                                        className="bg-orange-500 hover:bg-orange-600 h-8 w-8 p-0"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      onClick={() => addToCart(item.id)}
                                      className="bg-orange-500 hover:bg-orange-600"
                                      size="sm"
                                    >
                                      <Plus className="h-4 w-4 mr-1 lg:mr-2" />
                                      <span className="hidden sm:inline">Add</span>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 lg:top-24">
              <CardContent className="p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order ({cartItemsCount} items)
                </h3>
                
                {cartItemsCount === 0 ? (
                  <p className="text-gray-500 text-center py-6 lg:py-8 text-sm lg:text-base">
                    Your cart is empty. Add items from the menu.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {kitchen.menu
                        .filter(item => cart[item.id] > 0)
                        .map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm lg:text-base">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-xs lg:text-sm text-gray-500">₹{item.price} × {cart[item.id]}</p>
                            </div>
                            <p className="font-semibold ml-2">₹{item.price * cart[item.id]}</p>
                          </div>
                        ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-semibold text-base lg:text-lg">Total</p>
                      <p className="font-bold text-lg lg:text-xl text-orange-500">₹{cartTotal}</p>
                    </div>
                    
                    <Link to="/checkout">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDetails;
