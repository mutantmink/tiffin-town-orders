
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Bell,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your kitchen today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Today's Orders</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.todayOrders}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Weekly Revenue</p>
                      <p className="text-3xl font-bold text-gray-800">₹{stats.weeklyRevenue}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Menu Items</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.activeMenuItems}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.averageRating}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm">{order.items.join(', ')}</p>
                          <p className="text-sm text-gray-600">{order.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total}</p>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
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
