
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';

const OrderSuccess = () => {
  // Sample order data
  const order = {
    id: "TFC12345",
    kitchenName: "Amma's Kitchen",
    kitchenPhone: "+91 98765 43210",
    estimatedDelivery: "30-45 minutes",
    items: [
      { name: "South Indian Thali", quantity: 2, price: 240 },
      { name: "Curd Rice", quantity: 1, price: 80 }
    ],
    total: 340,
    address: "123 MG Road, Koramangala, Bangalore",
    customerName: "John Doe",
    customerPhone: "+91 98765 43211"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="text-center mb-8">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-4">
                Thank you for your order. We've received your request and the kitchen is preparing your meal.
              </p>
              <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
                Order ID: {order.id}
              </Badge>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Kitchen:</span>
                  <span>{order.kitchenName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {order.estimatedDelivery}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Kitchen Contact:</span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {order.kitchenPhone}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="font-medium">Delivery Address:</span>
                  <span className="text-right max-w-xs flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    {order.address}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">₹{item.price}</span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-orange-500">₹{order.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Kitchen Confirmation</p>
                    <p className="text-sm text-gray-600">The kitchen will call you to confirm your order</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Preparation</p>
                    <p className="text-sm text-gray-600">Your fresh meal is being prepared with care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-gray-600">Your order will be delivered to your doorstep</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">
                Order Again
              </Button>
            </Link>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Track Order (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
