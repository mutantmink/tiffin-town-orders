
import { useState } from 'react';
import { 
  ShoppingBag, 
  TrendingUp,
  Users,
  Package,
  Eye
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VendorSidebar from '@/components/vendor/VendorSidebar';
import MenuManagement from '@/components/vendor/MenuManagement';
import OrdersManagement from '@/components/vendor/OrdersManagement';
import VendorSettings from '@/components/vendor/VendorSettings';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stats = {
    todayOrders: 12,
    weeklyRevenue: 8450,
    activeMenuItems: 15,
    averageRating: 4.7
  };

  const recentOrders = [
    {
      id: 'TFC12345',
      customer: 'John Doe',
      items: ['South Indian Thali', 'Curd Rice'],
      total: 200,
      status: 'new',
      time: '2 min ago'
    },
    {
      id: 'TFC12344',
      customer: 'Jane Smith',
      items: ['Vegetable Biriyani'],
      total: 140,
      status: 'preparing',
      time: '15 min ago'
    },
    {
      id: 'TFC12343',
      customer: 'Mike Johnson',
      items: ['South Indian Thali', 'Sambar Rice'],
      total: 210,
      status: 'delivered',
      time: '1 hour ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'preparing': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <VendorSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 pt-20 pb-20 lg:pt-0 lg:pb-0 px-4 lg:p-8">
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
              <p className="text-gray-600 text-sm lg:text-base">Welcome back! Here's your kitchen overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Today</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-800">{stats.todayOrders}</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 lg:h-6 lg:w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Weekly</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-800">₹{stats.weeklyRevenue}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Menu</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-800">{stats.activeMenuItems}</p>
                      <p className="text-xs text-gray-500">Items</p>
                    </div>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 lg:h-6 lg:w-6 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Rating</p>
                      <p className="text-xl lg:text-3xl font-bold text-gray-800">{stats.averageRating}</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 lg:h-6 lg:w-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg lg:text-xl">Recent Orders</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs lg:text-sm"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 lg:p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm lg:text-base">#{order.id}</p>
                          <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-xs lg:text-sm text-gray-600 truncate">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-semibold text-sm lg:text-base">₹{order.total}</p>
                        <Button size="sm" variant="outline" className="mt-1">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'orders' && <OrdersManagement />}
        {activeTab === 'settings' && <VendorSettings />}
      </div>
    </div>
  );
};

export default VendorDashboard;
