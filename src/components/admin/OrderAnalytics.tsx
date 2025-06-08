
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from 'lucide-react';

const OrderAnalytics = () => {
  // Sample analytics data
  const dailyOrdersData = [
    { day: 'Mon', orders: 45, revenue: 5400 },
    { day: 'Tue', orders: 52, revenue: 6240 },
    { day: 'Wed', orders: 38, revenue: 4560 },
    { day: 'Thu', orders: 61, revenue: 7320 },
    { day: 'Fri', orders: 75, revenue: 9000 },
    { day: 'Sat', orders: 89, revenue: 10680 },
    { day: 'Sun', orders: 67, revenue: 8040 }
  ];

  const cuisineData = [
    { name: 'South Indian', orders: 320, color: '#FF6B35' },
    { name: 'North Indian', orders: 280, color: '#F7931E' },
    { name: 'Continental', orders: 150, color: '#FFD23F' },
    { name: 'Chinese', orders: 120, color: '#06FFA5' },
    { name: 'Bengali', orders: 90, color: '#118AB2' },
    { name: 'Others', orders: 85, color: '#6C757D' }
  ];

  const topKitchens = [
    { name: "Amma's Kitchen", orders: 156, revenue: 18720, growth: 12.5 },
    { name: "Mumbai Tiffins", orders: 142, revenue: 17040, growth: 8.3 },
    { name: "Delhi Delights", orders: 128, revenue: 15360, growth: -2.1 },
    { name: "Spice Garden", orders: 98, revenue: 11760, growth: 15.7 },
    { name: "Chennai Express", orders: 87, revenue: 10440, growth: 5.4 }
  ];

  const monthlyGrowth = [
    { month: 'Jan', orders: 980, revenue: 117600 },
    { month: 'Feb', orders: 1240, revenue: 148800 },
    { month: 'Mar', orders: 1560, revenue: 187200 },
    { month: 'Apr', orders: 1890, revenue: 226800 },
    { month: 'May', orders: 2340, revenue: 280800 },
    { month: 'Jun', orders: 2780, revenue: 333600 }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Platform performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Weekly Orders</p>
                <p className="text-2xl font-bold">427</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Weekly Revenue</p>
                <p className="text-2xl font-bold">₹51.2K</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.3%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold">₹120</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2.1%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Customer Satisfaction</p>
                <p className="text-2xl font-bold">4.6</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.2
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-500 text-sm">⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Orders & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="orders" fill="#FF6B35" name="Orders" />
                <Bar yAxisId="right" dataKey="revenue" fill="#F7931E" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Cuisine Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cuisineData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="orders"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {cuisineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#FF6B35" strokeWidth={3} name="Orders" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#F7931E" strokeWidth={3} name="Revenue (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Kitchens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topKitchens.map((kitchen, index) => (
                <div key={kitchen.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{kitchen.name}</p>
                      <p className="text-sm text-gray-600">{kitchen.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{kitchen.revenue.toLocaleString()}</p>
                    <p className={`text-xs flex items-center justify-end ${
                      kitchen.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kitchen.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(kitchen.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderAnalytics;
