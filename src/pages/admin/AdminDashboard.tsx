
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  Package,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from '@/components/admin/AdminSidebar';
import KitchenManagement from '@/components/admin/KitchenManagement';
import OrderAnalytics from '@/components/admin/OrderAnalytics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample platform stats
  const platformStats = {
    totalKitchens: 156,
    activeKitchens: 142,
    totalOrders: 12845,
    totalRevenue: 845600,
    dailyOrders: 89,
    weeklyGrowth: 12.5
  };

  const recentKitchens = [
    {
      id: 1,
      name: "Delhi Delights",
      owner: "Rajesh Kumar",
      status: "pending",
      cuisine: "North Indian",
      registeredDate: "2024-06-07"
    },
    {
      id: 2,
      name: "Mumbai Tiffins",
      owner: "Priya Sharma",
      status: "active",
      cuisine: "Maharashtrian",
      registeredDate: "2024-06-06"
    },
    {
      id: 3,
      name: "Kolkata Kitchen",
      owner: "Amit Roy",
      status: "pending",
      cuisine: "Bengali",
      registeredDate: "2024-06-05"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Platform Overview</h1>
              <p className="text-gray-600">Monitor and manage the TiffinConnect platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Kitchens</p>
                      <p className="text-3xl font-bold text-gray-800">{platformStats.totalKitchens}</p>
                      <p className="text-xs text-green-600">+{platformStats.weeklyGrowth}% this week</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Store className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-800">{platformStats.totalOrders.toLocaleString()}</p>
                      <p className="text-xs text-blue-600">{platformStats.dailyOrders} today</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Platform Revenue</p>
                      <p className="text-3xl font-bold text-gray-800">₹{(platformStats.totalRevenue / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-green-600">+15.2% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Kitchens</p>
                      <p className="text-3xl font-bold text-gray-800">{platformStats.activeKitchens}</p>
                      <p className="text-xs text-gray-600">{((platformStats.activeKitchens / platformStats.totalKitchens) * 100).toFixed(1)}% active</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Kitchen Applications */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Kitchen Applications</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('kitchens')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentKitchens.map((kitchen) => (
                    <div key={kitchen.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{kitchen.name}</p>
                          <p className="text-sm text-gray-600">Owner: {kitchen.owner}</p>
                        </div>
                        <div>
                          <p className="text-sm">{kitchen.cuisine}</p>
                          <p className="text-sm text-gray-600">Applied: {kitchen.registeredDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={`${getStatusColor(kitchen.status)} text-white`}>
                          {kitchen.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {kitchen.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('kitchens')}>
                <CardContent className="p-6 text-center">
                  <Store className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Manage Kitchens</h3>
                  <p className="text-sm text-gray-600">Review applications and manage kitchen profiles</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('analytics')}>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">View Analytics</h3>
                  <p className="text-sm text-gray-600">Monitor platform performance and trends</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('settings')}>
                <CardContent className="p-6 text-center">
                  <Settings className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Platform Settings</h3>
                  <p className="text-sm text-gray-600">Configure platform-wide settings and policies</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'kitchens' && <KitchenManagement />}
        {activeTab === 'analytics' && <OrderAnalytics />}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Platform Settings</h1>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
