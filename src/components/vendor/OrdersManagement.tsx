
import { useState } from 'react';
import { Eye, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'TFC12345',
      customerName: 'John Doe',
      customerPhone: '+91 98765 43210',
      address: '123 MG Road, Koramangala, Bangalore',
      items: [
        { name: 'South Indian Thali', quantity: 2, price: 240 },
        { name: 'Curd Rice', quantity: 1, price: 80 }
      ],
      total: 340,
      status: 'new',
      orderTime: '2024-06-08 12:30:00',
      instructions: 'Extra pickle please'
    },
    {
      id: 'TFC12344',
      customerName: 'Jane Smith',
      customerPhone: '+91 98765 43211',
      address: '456 Brigade Road, Bangalore',
      items: [
        { name: 'Vegetable Biriyani', quantity: 1, price: 140 }
      ],
      total: 160,
      status: 'preparing',
      orderTime: '2024-06-08 12:15:00',
      instructions: ''
    },
    {
      id: 'TFC12343',
      customerName: 'Mike Johnson',
      customerPhone: '+91 98765 43212',
      address: '789 Commercial Street, Bangalore',
      items: [
        { name: 'South Indian Thali', quantity: 1, price: 120 },
        { name: 'Sambar Rice', quantity: 1, price: 90 }
      ],
      total: 230,
      status: 'delivered',
      orderTime: '2024-06-08 11:45:00',
      instructions: 'Delivery at gate'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = [
    { value: 'new', label: 'New Order', color: 'bg-blue-500' },
    { value: 'accepted', label: 'Accepted', color: 'bg-green-500' },
    { value: 'preparing', label: 'Preparing', color: 'bg-yellow-500' },
    { value: 'ready', label: 'Ready for Pickup', color: 'bg-purple-500' },
    { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-indigo-500' },
    { value: 'delivered', label: 'Delivered', color: 'bg-gray-500' }
  ];

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'bg-gray-500';
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.label : status;
  };

  const filterOrdersByStatus = (status) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Orders Management</h1>
        <p className="text-gray-600">Track and manage your incoming orders</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="new">New ({filterOrdersByStatus('new').length})</TabsTrigger>
          <TabsTrigger value="preparing">Preparing ({filterOrdersByStatus('preparing').length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({filterOrdersByStatus('delivered').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrdersList orders={orders} />
        </TabsContent>
        <TabsContent value="new">
          <OrdersList orders={filterOrdersByStatus('new')} />
        </TabsContent>
        <TabsContent value="preparing">
          <OrdersList orders={filterOrdersByStatus('preparing')} />
        </TabsContent>
        <TabsContent value="delivered">
          <OrdersList orders={filterOrdersByStatus('delivered')} />
        </TabsContent>
      </Tabs>
    </div>
  );

  function OrdersList({ orders }) {
    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatTime(order.orderTime)}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  {getStatusLabel(order.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer</p>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {order.customerPhone}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Items</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm">
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="font-bold text-xl text-orange-500">₹{order.total}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-sm flex items-start gap-1">
                    <MapPin className="h-3 w-3 mt-0.5" />
                    {order.address}
                  </p>
                </div>
              </div>

              {order.instructions && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Special Instructions:</p>
                  <p className="text-sm">{order.instructions}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Order Details - #{order.id}</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Customer Name</Label>
                            <p className="font-medium">{selectedOrder.customerName}</p>
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <p className="font-medium">{selectedOrder.customerPhone}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Delivery Address</Label>
                          <p className="font-medium">{selectedOrder.address}</p>
                        </div>
                        <div>
                          <Label>Items Ordered</Label>
                          <div className="space-y-2">
                            {selectedOrder.items.map((item, index) => (
                              <div key={index} className="flex justify-between border-b pb-1">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{item.price}</span>
                              </div>
                            ))}
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span>₹{selectedOrder.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <div className="flex items-center gap-2">
                  <Select 
                    value={order.status} 
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {orders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No orders found</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
};

export default OrdersManagement;
