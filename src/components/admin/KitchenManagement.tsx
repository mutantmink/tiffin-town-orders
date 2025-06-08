
import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const KitchenManagement = () => {
  const [kitchens, setKitchens] = useState([
    {
      id: 1,
      name: "Amma's Kitchen",
      owner: "Kamala Devi",
      email: "kamala@ammaskitchen.com",
      phone: "+91 98765 43210",
      cuisine: "South Indian",
      address: "123 Temple Street, Koramangala, Bangalore",
      status: "active",
      registeredDate: "2024-05-15",
      totalOrders: 450,
      rating: 4.8,
      revenue: 54000
    },
    {
      id: 2,
      name: "Delhi Delights",
      owner: "Rajesh Kumar",
      email: "rajesh@delhidelights.com",
      phone: "+91 98765 43211",
      cuisine: "North Indian",
      address: "456 CP Road, New Delhi",
      status: "pending",
      registeredDate: "2024-06-07",
      totalOrders: 0,
      rating: 0,
      revenue: 0
    },
    {
      id: 3,
      name: "Mumbai Tiffins",
      owner: "Priya Sharma",
      email: "priya@mumbaitiffins.com",
      phone: "+91 98765 43212",
      cuisine: "Maharashtrian",
      address: "789 Andheri West, Mumbai",
      status: "active",
      registeredDate: "2024-05-20",
      totalOrders: 320,
      rating: 4.6,
      revenue: 38400
    },
    {
      id: 4,
      name: "Spice Garden",
      owner: "Ahmed Khan",
      email: "ahmed@spicegarden.com",
      phone: "+91 98765 43213",
      cuisine: "Mughlai",
      address: "321 Old City, Hyderabad",
      status: "inactive",
      registeredDate: "2024-04-10",
      totalOrders: 125,
      rating: 4.2,
      revenue: 15000
    }
  ]);

  const [selectedKitchen, setSelectedKitchen] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const updateKitchenStatus = (id, newStatus) => {
    setKitchens(prev => prev.map(kitchen => 
      kitchen.id === id ? { ...kitchen, status: newStatus } : kitchen
    ));
  };

  const filterKitchensByStatus = (status) => {
    if (status === 'all') return kitchens;
    return kitchens.filter(kitchen => kitchen.status === status);
  };

  const filteredKitchens = kitchens.filter(kitchen =>
    kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kitchen.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kitchen.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kitchen Management</h1>
          <p className="text-gray-600">Manage all registered kitchens and review applications</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search kitchens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Kitchens ({kitchens.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({filterKitchensByStatus('active').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterKitchensByStatus('pending').length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({filterKitchensByStatus('inactive').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <KitchenTable kitchens={filteredKitchens} />
        </TabsContent>
        <TabsContent value="active">
          <KitchenTable kitchens={filterKitchensByStatus('active').filter(k => 
            k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            k.owner.toLowerCase().includes(searchTerm.toLowerCase())
          )} />
        </TabsContent>
        <TabsContent value="pending">
          <KitchenTable kitchens={filterKitchensByStatus('pending').filter(k => 
            k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            k.owner.toLowerCase().includes(searchTerm.toLowerCase())
          )} />
        </TabsContent>
        <TabsContent value="inactive">
          <KitchenTable kitchens={filterKitchensByStatus('inactive').filter(k => 
            k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            k.owner.toLowerCase().includes(searchTerm.toLowerCase())
          )} />
        </TabsContent>
      </Tabs>
    </div>
  );

  function KitchenTable({ kitchens }) {
    return (
      <div className="space-y-4">
        {kitchens.map((kitchen) => (
          <Card key={kitchen.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{kitchen.name}</h3>
                    <Badge className={`${getStatusColor(kitchen.status)} text-white`}>
                      {kitchen.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">Owner: {kitchen.owner}</p>
                  <p className="text-gray-600 mb-1">Cuisine: {kitchen.cuisine}</p>
                  <p className="text-gray-600">Registered: {kitchen.registeredDate}</p>
                </div>

                <div className="text-right">
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Orders</p>
                      <p className="font-semibold">{kitchen.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="font-semibold">{kitchen.rating || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold">₹{kitchen.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedKitchen(kitchen)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Kitchen Details - {kitchen.name}</DialogTitle>
                        </DialogHeader>
                        {selectedKitchen && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Kitchen Name</Label>
                                <p className="font-medium">{selectedKitchen.name}</p>
                              </div>
                              <div>
                                <Label>Owner Name</Label>
                                <p className="font-medium">{selectedKitchen.owner}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Email</Label>
                                <p className="font-medium">{selectedKitchen.email}</p>
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <p className="font-medium">{selectedKitchen.phone}</p>
                              </div>
                            </div>
                            <div>
                              <Label>Address</Label>
                              <p className="font-medium">{selectedKitchen.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Cuisine Type</Label>
                                <p className="font-medium">{selectedKitchen.cuisine}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <Badge className={`${getStatusColor(selectedKitchen.status)} text-white`}>
                                  {selectedKitchen.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {kitchen.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => updateKitchenStatus(kitchen.id, 'active')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => updateKitchenStatus(kitchen.id, 'inactive')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}

                    {kitchen.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => updateKitchenStatus(kitchen.id, 'inactive')}
                      >
                        Deactivate
                      </Button>
                    )}

                    {kitchen.status === 'inactive' && (
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => updateKitchenStatus(kitchen.id, 'active')}
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {kitchens.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No kitchens found</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
};

export default KitchenManagement;
